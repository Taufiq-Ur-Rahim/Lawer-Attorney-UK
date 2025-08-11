// controllers/chatController.js
import Chat from '../models/Chat.js';
import createError from '../utils/error.js';

class ChatController {
  // Create or get existing chat between a user and a lawyer
  static createOrGetChat = async (req, res, next) => {
    console.log("🔵 createOrGetChat called");
    try {
      const { userId, lawyerId } = req.body;
      console.log("➡️  Request body:", req.body);

      if (!userId || !lawyerId) {
        console.warn("⚠️  Missing userId or lawyerId");
        return res.status(400).json({ message: "userId and lawyerId are required" });
      }

      console.log("🔍 Looking for existing chat...");
      let chat = await Chat.findOne({ user: userId, lawyer: lawyerId })
        .populate('user', '-password')
        .populate('lawyer', '-password')
        .populate({
          path: 'latestMessage',
          populate: {
            path: 'sender',
            select: 'firstName lastName email',
            refPath: 'senderModel'
          }
        });

      if (chat) {
        console.log("✅ Existing chat found:", chat._id);
        return res.status(200).json(chat);
      }

      console.log("🟡 No existing chat found, creating a new one...");
      const newChat = new Chat({ user: userId, lawyer: lawyerId });
      console.log("🟡 New chat object created:", newChat);
      
      const savedChat = await newChat.save();
      console.log("🟡 Chat saved to database:", savedChat._id);

      // Use findById to get the populated document
      const populated = await Chat.findById(savedChat._id)
        .populate('user', '-password')
        .populate('lawyer', '-password')
        .populate({
          path: 'latestMessage',
          populate: {
            path: 'sender',
            select: 'firstName lastName email',
            refPath: 'senderModel'
          }
        });

      console.log("✅ New chat created and populated:", populated._id);
      res.status(201).json(populated);
    } catch (err) {
      console.error("❌ Error in createOrGetChat:", err);
      console.error("❌ Error name:", err.name);
      console.error("❌ Error message:", err.message);
      console.error("❌ Error stack:", err.stack);
      next(err);
    }
  };

  // Get all chats for a specific user
  static getUserChats = async (req, res, next) => {
    console.log("🔵 getUserChats called for userId:", req.params.userId);
    try {
      const chats = await Chat.find({ user: req.params.userId })
        .populate('lawyer', '-password')
        .populate({
          path: 'latestMessage',
          populate: {
            path: 'sender',
            select: 'firstName lastName email',
            refPath: 'senderModel'
          }
        })
        .sort({ updatedAt: -1 });

      console.log(`✅ Found ${chats.length} chats for user`);
      res.status(200).json(chats);
    } catch (err) {
      console.error("❌ Error in getUserChats:", err);
      next(err);
    }
  };

  // Get all chats for a specific lawyer
  static getLawyerChats = async (req, res, next) => {
    console.log("🔵 getLawyerChats called for lawyerId:", req.params.lawyerId);
    try {
      const chats = await Chat.find({ lawyer: req.params.lawyerId })
        .populate('user', '-password')
        .populate({
          path: 'latestMessage',
          populate: {
            path: 'sender',
            select: 'firstName lastName email',
            refPath: 'senderModel'
          }
        })
        .sort({ updatedAt: -1 });

      console.log(`✅ Found ${chats.length} chats for lawyer`);
      res.status(200).json(chats);
    } catch (err) {
      console.error("❌ Error in getLawyerChats:", err);
      next(err);
    }
  };

  // Get a specific chat by ID
  static getChatById = async (req, res, next) => {
    console.log("🔵 getChatById called for chatId:", req.params.chatId);
    try {
      // Validate chatId format
      if (!req.params.chatId || req.params.chatId.length !== 24) {
        console.warn("⚠️  Invalid chatId format:", req.params.chatId);
        return res.status(400).json({ message: 'Invalid chat ID format' });
      }

      const chat = await Chat.findById(req.params.chatId)
        .populate('user', '-password')
        .populate('lawyer', '-password')
        .populate({
          path: 'latestMessage',
          populate: {
            path: 'sender',
            select: 'firstName lastName email',
            refPath: 'senderModel'
          }
        });

      if (!chat) {
        console.warn("⚠️  Chat not found for ID:", req.params.chatId);
        return res.status(404).json({ message: 'Chat not found' });
      }

      console.log("✅ Chat found:", chat._id);
      res.status(200).json(chat);
    } catch (err) {
      console.error("❌ Error in getChatById:", err);
      if (err.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid chat ID format' });
      }
      next(err);
    }
  };

  // Optional: Get a specific chat directly
  static getChatByParticipants = async (req, res, next) => {
    console.log("🔵 getChatByParticipants called with:", req.params);
    try {
      const { userId, lawyerId } = req.params;

      const chat = await Chat.findOne({ user: userId, lawyer: lawyerId })
        .populate('user', '-password')
        .populate('lawyer', '-password')
        .populate({
          path: 'latestMessage',
          populate: {
            path: 'sender',
            select: 'firstName lastName email',
            refPath: 'senderModel'
          }
        });

      if (!chat) {
        console.warn("⚠️  Chat not found");
        return res.status(404).json({ message: 'Chat not found' });
      }

      console.log("✅ Chat found:", chat._id);
      res.status(200).json(chat);
    } catch (err) {
      console.error("❌ Error in getChatByParticipants:", err);
      next(err);
    }
  };
}

export default ChatController;
