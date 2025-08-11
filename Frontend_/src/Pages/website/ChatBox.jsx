import React, { useEffect, useRef, useState, useContext } from "react";
import { Store } from "../../Utils/Store";
import api from "../../Utils/Axios";
import { toast } from "react-toastify";

function ChatBox({ chatId, visible }) {
  const { state } = useContext(Store);
  const { UserInfo } = state;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!chatId) return;

    const fetchMessages = async () => {
      try {
        const { data } = await api.get(`/chat/messages/${chatId}`);
        setMessages(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load messages");
      }
    };

    fetchMessages();
  }, [chatId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const { data } = await api.post("/chat/messages", {
        content: newMessage,
        chatId,
        sender: UserInfo._id,
      });
      setMessages((prev) => [...prev, data]);
      setNewMessage("");
    } catch (err) {
      toast.error("Message failed");
      console.error(err);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!visible) return null;

  return (
    <div className="chat-box border p-3 rounded mt-4" style={{ background: "#f9f9f9" }}>
      <div style={{ maxHeight: "300px", overflowY: "auto" }}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.sender === UserInfo._id ? "text-end" : "text-start"}`}>
            <div className={`p-2 rounded ${msg.sender === UserInfo._id ? "bg-primary text-white" : "bg-light"}`}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="d-flex mt-2">
        <input
          type="text"
          className="form-control me-2"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="btn btn-success" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
