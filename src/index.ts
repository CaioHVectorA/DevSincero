import { AtpAgent } from '@atproto/api';
import * as dotenv from 'dotenv';
import { CronJob } from 'cron';
import * as process from 'process';
import { gemini } from './gemini';
import { THEMES } from './themes';

function mountRequest({
    type,
    content,
    user,
  }: {
    type: "post" | "comment";
    content?: string;
    user?: string;
  }) {
    return JSON.stringify({
      type,
      date: new Date().toUTCString(),
      content: content || "null",
      user: user || "null",
      theme: THEMES[Math.floor(Math.random() * THEMES.length)],
    });
  }
// Create a Bluesky Agent 
const agent = new AtpAgent({
    service: new URL('https://bsky.social'),
  })

let tries = 0;
async function main() {
    try {
        const req = mountRequest({ type: "post" });
        const response = await gemini(req)
        await agent.login({ identifier: process.env.BLUESKY_USERNAME!, password: process.env.BLUESKY_PASSWORD!})
        await agent.post({
            text: response,
        });
        tries = 0;
    } catch (error) {
        console.error(error);
        if (tries < 5) {
            tries++;
            main();
        }
    }
}
main();
// Run once every 5 minute for testing
const scheduleExpressionMinute = '*/25 * * * *';
// Run once every hour in prod
const scheduleExpression = '0 * * * *'; 

const job = new CronJob(scheduleExpressionMinute, main); // change to scheduleExpressionMinute for testing

job.start();