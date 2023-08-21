// Open AI 
import OpenAI from 'openai';

// reading input from the console
import readline from 'readline';

//Load environment variables (populate process.env from .env file)
import * as dotenv from "dotenv";
dotenv.config();


//Instantiante the OpenAI model 
const openai = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"]
  });

const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


console.log("Enter your question for OpenAI. Ctrl-C to exit.")
userInterface.prompt();
userInterface.on("line", async (line: string) => {

    const stream = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: line }], // our input is what we wrote on the console
    stream: true,
    });

    for await (const part of stream) {
    process.stdout.write(part.choices[0]?.delta?.content || '');
    }

    console.log("\n\n\n")
    userInterface.prompt();
});