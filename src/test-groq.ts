import { groq, MODELS } from "./groq";
import { THEMES } from "./themes";

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

for (let i = 0; i < 10; i++) {
  const system = await Bun.file("prompt.txt").text();
  const req = mountRequest({ type: "post" });

  const response = await groq(req, {
    system,
    model: "L",
    temperature: 0,
  });
  console.log({ response, theme: JSON.parse(req).theme });
}
