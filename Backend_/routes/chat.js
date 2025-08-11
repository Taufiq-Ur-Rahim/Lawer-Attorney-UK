// routes/chat.js
import express from 'express';
import ChatController from '../controllers/chatController.js';
import verifyToken from '../utils/VerifyToken.js';
import Chat from '../models/Chat.js';

const router = express.Router();

router.post('/', ChatController.createOrGetChat); // create/resume chat - no auth needed
router.get('/user/:userId', ChatController.getUserChats); // get all chats for user - no auth needed
router.get('/lawyer/:lawyerId', ChatController.getLawyerChats); // get all chats for lawyer - no auth needed
router.get('/find/:userId/:lawyerId', ChatController.getChatByParticipants); // specific chat - no auth needed
router.get('/:chatId', ChatController.getChatById); // get specific chat by ID - no auth needed

// Debug route to list all chats
router.get('/debug/all', async (req, res) => {
  try {
    const chats = await Chat.find().populate('user', 'firstName lastName').populate('lawyer', 'firstName lastName');
    res.json({ count: chats.length, chats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
