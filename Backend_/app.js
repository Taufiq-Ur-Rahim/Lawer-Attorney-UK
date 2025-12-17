import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import err from './utils/error.js';
import user from './routes/user.js';
import lawyer from './routes/lawyer.js';
import authentication from './routes/authentication.js';
import payment from './routes/payment.js';
import Rating from './routes/rating.js';
import cors from 'cors';
import chatRoutes from './routes/chat.js';
import messageRoutes from './routes/message.js';


import http from 'http';
import { Server } from 'socket.io';

dotenv.config(); 

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', // Replace with your frontend URL in production
    methods: ['GET', 'POST'],
  },
});

const port = process.env.PORT || 8000;
console.log("DB URI:", process.env.db2);


// ==================== DB Connection ====================
const connect = async () => {
  try {
    await mongoose.connect(process.env.db2);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
  }
};

// ==================== Middleware ====================
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use('/chat', chatRoutes);
app.use('/messages', messageRoutes);

// ==================== Error Handler ====================
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  
  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// ==================== Routes ====================
app.use('/user', user);
app.use('/lawyer', lawyer);
app.use('/payments', payment);
app.use('/auth', authentication);
app.use('/rating', Rating);

// ==================== Socket.IO ====================
io.on('connection', (socket) => {
  console.log(`🔌 Socket connected: ${socket.id}`);

  // Join chat room
socket.on('join_chat', ({ chatId, userId, userType }) => {
  socket.join(chatId);
  socket.data = { userId, userType }; // You can access it later if needed
  console.log(`${userType} ${userId} joined chat ${chatId}`);
});


  // Send and broadcast message
  socket.on('send_message', ({ chatId, message }) => {
    socket.to(chatId).emit('receive_message', message);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`🔌 Socket disconnected: ${socket.id}`);
  });
});

// ==================== Start Server ====================
server.listen(port, () => {
  connect();
  console.log(`🚀 Server is running with Socket.IO at http://localhost:${port}`);
});
