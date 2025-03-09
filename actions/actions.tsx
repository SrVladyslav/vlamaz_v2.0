'use server'

import Groq from "groq-sdk";

type ChatMessage = {
    role: string;
    content: string;
}

async function askAI(chat:ChatMessage[] | any) {
    const groq = new Groq({ apiKey: process.env.GROQ_API });

    return groq.chat.completions.create({
        messages: chat,
        model: "llama3-70b-8192",
        // model: "llama3-8b-8192",
    })

}

export async function getAIResponse(question:string, prevMessages?:ChatMessage[]) {
    const newMessage = {
        role:'user',
        content: question
    }

    if (!prevMessages) prevMessages = []
    prevMessages.push(newMessage)

    const aiResponse = await askAI(prevMessages)
    return aiResponse?.choices[0]?.message?.content || 'Lo siento, no puedo responderte en estos momentos.'
}