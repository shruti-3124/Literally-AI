const { getsummary, getsentiment, generateReply } = require('../models/models');
const ChatHistory=require('../models/chat')
const summarize = async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }
    const result = await getsummary(userInput);
    const chat = new ChatHistory({ userInput, response: result, type: 'summary' });
    await chat.save();
    res.json({ result });
  } catch (error) {
    console.error('Error in summary endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const sentiment = async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }
    const result = await getsentiment(userInput);
    const chat = new ChatHistory({ userInput, response: result, type: 'sentiment' });
    await chat.save();
    res.json({ result });
  } catch (error) {
    console.error('Error in sentiment endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const reply = async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }
    const result = await generateReply(userInput);
    const chat = new ChatHistory({ userInput, response: result, type: 'reply' });
    await chat.save();
    res.json({ result });
  } catch (error) {
    console.error('Error in reply endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { summarize, sentiment, reply };
