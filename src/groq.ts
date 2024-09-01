import { Groq } from "groq-sdk";
import { encode } from "gpt-tokenizer/esm/model/davinci-codex"; // tokenizer

// Map of model shortcodes to full model names
export const MODELS = {
  l: 'llama3-8b-8192',
  L: 'llama3-70b-8192',
  L2: 'llama2-70b-4096',
  m: 'mixtral-8x7b-32768',
  g: 'gemma-7b-it'
};

// Utility function to read the Groq API token
async function getGroqToken() {
  return process.env.GROQ_KEY;
}

// Factory function to create a stateful asker
function asker() {
  const messages = [] as { role: string, content: string }[];

  // Asker function that maintains conversation state
  async function groq(userMessage: string, { system, model, temperature = 0.0, max_tokens = 4096 }: { system: string, model: keyof typeof MODELS, temperature?: number, max_tokens?: number }) {
    const choosen_model = MODELS[model];

    const client = new Groq({ apiKey: await getGroqToken() });

    if (messages.length === 0) {
      messages.push({ role: "system", content: system });
    }

    messages.push({ role: "user", content: userMessage });
    const params = {
      system: undefined,
      model: choosen_model,
      temperature,
      max_tokens,
      stream: true,
      messages: messages.map(msg => ({ role: msg.role, content: msg.content }))
    };

    let result = "";

    const stream = await client.chat.completions.create(params as any);
    //@ts-ignore
    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || "";
    //   process.stdout.write(text);
      result += text;
    }

    // messages.push({ role: 'assistant', content: result });

    return result;
  }

  return groq;
}

export function token_count(inputText: string) {
  // Encode the input string into tokens
  const tokens = encode(inputText);

  // Get the number of tokens 
  const numberOfTokens = tokens.length;

  // Return the number of tokens
  return numberOfTokens;
}

export const groq = asker();