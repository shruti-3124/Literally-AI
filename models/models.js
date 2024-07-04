const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const dotenv = require('dotenv').config();
const API_KEY = process.env.API_KEY;

async function getsummary(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: 'you are a model that can only summarize long texts and you cant answer any other question just reply provide text to summarize',
  });

  const generationConfig = {
    temperature: 0.7,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
  };
  
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: 'user',
        parts: [{ text: 'i am not feeling well' }],
      },
      {
        role: 'model',
        parts: [{ text: '1. **Sympathetic:** "Oh no, I\'m so sorry to hear that! What\'s going on?"\n2. **Concerned:** "I\'m really sorry you\'re not feeling well. Is there anything I can do to help?"\n3. **Casual:** "Aw, that\'s a bummer. Hope you feel better soon!" \n' }],
      },
    ],
  });

  const result = await chatSession.sendMessage(userInput);
  console.log(result.response.text());
  return result.response.text();
}

async function getsentiment(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: 'you are a human who can easily understand sentiment behind a person\'s message and you can\'t answer anything else. You can easily narrate sentiments to a user, provide sentiment of sender and probably why can he be feeling so',
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
  };
  
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: 'user',
        parts: [{ text: 'i am not feeling well' }],
      },
      {
        role: 'model',
        parts: [{ text: '1. **Sympathetic:** "Oh no, I\'m so sorry to hear that! What\'s going on?"\n2. **Concerned:** "I\'m really sorry you\'re not feeling well. Is there anything I can do to help?"\n3. **Casual:** "Aw, that\'s a bummer. Hope you feel better soon!" \n' }],
      },
    ],
  });

  const result = await chatSession.sendMessage(userInput);
  console.log(result.response.text());
  return result.response.text();
}

async function generateReply(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: 'you are a human who knows how to communicate well by understanding the mood of the person you suggest 3 replies in different tones that user can send and nothing else',
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
  };
  
  const chatSession = model.startChat({
    generationConfig,
  });

  const result = await chatSession.sendMessage(userInput);
  console.log(result.response.text());
  return result.response.text();
}

module.exports = { getsummary, getsentiment, generateReply };
