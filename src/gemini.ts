import fs from 'fs'
import { type Content, type GenerateContentRequest, GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY as string);
const system_prompt = fs.readFileSync('prompt.md', 'utf8')
const messages = [] satisfies Content[]
const options = {
    contents: messages,
    systemInstruction: system_prompt
} satisfies GenerateContentRequest

function Gemini() {
    const contents = [] as Content[]
    async function gemini(userMessage: string) {
        contents.push({ role: 'user', parts: [{ text: userMessage }] })
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });  
        const result = await model.generateContent({ 
            systemInstruction: system_prompt,
            contents: [{ role: 'user', parts: [{ text: userMessage }] }],
         });
        const response = await result.response;
        const text = response.text();
        console.log(text)
        return text;
    }
    return gemini
}

export const gemini = Gemini()