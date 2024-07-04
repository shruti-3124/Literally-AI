const { summarize, sentiment, reply } = require('../controllers/result');
const ChatHistory = require('../models/chat');
const router = require('express').Router();

router.route('/summary').post(summarize);
router.route('/sentiment').post(sentiment);
router.route('/reply').post(reply);

router.get('/history', async (req, res) => {
  try {
    const history = await ChatHistory.find().sort({ timestamp: -1 }).limit(100);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});

module.exports = router;
