// /models/chatModel.js
import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    lawyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'lawyer',
      required: true
    },
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message'
    }
  },
  { timestamps: true }
);

export default mongoose.model("Chat", ChatSchema);
