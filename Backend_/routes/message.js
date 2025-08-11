import express from 'express';
import Message from '../models/Massage.js';
import Chat from '../models/Chat.js';

const router = express.Router();

// Send a message - temporarily without auth
router.post('/', async (req, res, next) => {
  const { chatId, content, senderId, senderType } = req.body;

  try {
    console.log("🔵 POST /messages - Request body:", req.body);
    
    if (!chatId || !content || !senderId || !senderType) {
      console.log("❌ Missing required fields:", { chatId, content, senderId, senderType });
      return res.status(400).json({ message: 'chatId, content, senderId, and senderType are required' });
    }

    const message = await Message.create({
      sender: senderId,
      senderModel: senderType,
      content,
      chat: chatId
    });

    console.log("✅ Message created:", message);

    await Chat.findByIdAndUpdate(chatId, { latestMessage: message._id });

    res.status(201).json(message);
  } catch (err) {
    console.error('❌ Error creating message:', err);
    next(err);
  }
});

// Get all messages for a chat - temporarily without auth
router.get('/:chatId', async (req, res, next) => {
  try {
    console.log("🔵 GET /messages/:chatId - chatId:", req.params.chatId);
    
    if (!req.params.chatId) {
      console.log("❌ Missing chatId parameter");
      return res.status(400).json({ message: 'chatId is required' });
    }

    const messages = await Message.find({ chat: req.params.chatId })
      .populate({
        path: 'sender',
        select: 'firstName lastName email',
        refPath: 'senderModel'
      })
      .sort({ createdAt: 1 });

    console.log("✅ Messages found:", messages.length);

    res.json(messages);
  } catch (err) {
    console.error('❌ Error fetching messages:', err);
    next(err);
  }
});

export default router;
