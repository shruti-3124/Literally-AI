const mongoose = require('mongoose');

const chatHistorySchema = new mongoose.Schema({
  userInput: String,
  response: String,
  type: String, // 'summary', 'sentiment', 'reply'
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ChatHistory', chatHistorySchema);
