const Message = require('../models/Message');
const ChatService = require('../services/chatService');
const SentimentService = require('../services/sentimentService');

exports.sendMessage = async (req, res) => {
    try {
        const { text } = req.body;
        const sentiment = SentimentService.detectSentiment(text);
        const aiReply = await ChatService.handleMessage(text);

        const userMsg = await Message.create({ sender: 'You', text, sentiment });
        const aiMsg = await Message.create({ sender: 'AI', text: aiReply, sentiment: 'neutral' });

        res.json({ userMsg, aiMsg });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
};
