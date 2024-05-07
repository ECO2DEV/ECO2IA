// app/api/chat/route.js

import OpenAI from 'openai';
import { Configuration, OpenAIApi } from 'openai-edge';
import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  OpenAIStream,
  StreamingTextResponse,
  GoogleGenerativeAIStream
} from 'ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

const fireworks = new OpenAI({
  apiKey: process.env.FIREWORKS_API_KEY || '',
  baseURL: 'https://api.fireworks.ai/inference/v1'
});

const buildGoogleGenAIPrompt = (messages) => ({
  contents: messages
    .filter(
      (message) => message.role === 'user' || message.role === 'assistant'
    )
    .map((message) => ({
      role: message.role === 'user' ? 'user' : 'model',
      parts: [{ text: message.content }]
    }))
});

export const runtime = 'edge';

const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(apiConfig);

export default async function POST(req) {
  // Extract the `messages` from the body of the request
  const { messages, model } = await req.json();

  console.log('model', model);

  if (model === 'gpt-3.5-turbo' || model === 'gpt-4-turbo') {
    // Request the OpenAI API for the response based on the prompt
    const response = await openai.createChatCompletion({
      model: model,
      stream: true,
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 1,
      presence_penalty: 1
    });

    const stream = OpenAIStream(response);

    // Respond with the stream
    return new StreamingTextResponse(stream);
  } else if (model === 'gemini-pro') {
    const geminiStream = await genAI
      .getGenerativeModel({ model: 'gemini-pro' })
      .generateContentStream(buildGoogleGenAIPrompt(messages));

    // Convert the response into a friendly text-stream
    const stream = GoogleGenerativeAIStream(geminiStream);

    // Respond with the stream
    return new StreamingTextResponse(stream);
  } else {
    // Ask Fireworks for a streaming chat completion using Llama 2 70b model
    // @see https://app.fireworks.ai/models/fireworks/llama-v2-70b-chat
    const response = await fireworks.chat.completions.create({
      model: `accounts/fireworks/models/${model}`,
      stream: true,
      max_tokens: 1000,
      // i need the answer to be in spanish
      messages
    });
    // Convert the response into a friendly text-stream.
    const stream = OpenAIStream(response);
    // Respond with the stream
    return new StreamingTextResponse(stream);
  }
}
