// app/api/chat/route.js

import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export const runtime = 'edge';

const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(apiConfig);

export default async function POST(req) {
  // Extract the `messages` from the body of the request
  const { messages, model } = await req.json();

  // console.log('this is the model', model);

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

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
