import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../Utils/Axios";
import { Store } from "../../Utils/Store";
import { toast } from "react-toastify";

function ChatPageNew() {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { UserInfo } = state;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [error, setError] = useState(null);
  const [chatInfo, setChatInfo] = useState(null);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const hasLoadedChat = useRef(false);

  const getCurrentUser = () => {
    try {
      const userFromStorage = localStorage.getItem("UserInfo");
      if (userFromStorage) {
        return JSON.parse(userFromStorage);
      }
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
    }
    return null;
  };

  const currentUser = getCurrentUser();

  useEffect(() => {
    const checkAuth = () => {
      const userFromStorage = localStorage.getItem("UserInfo");
      if (!userFromStorage) {
        toast.error("Please login to access chat");
        navigate('/login');
        return false;
      }
      return true;
    };

    const timer = setTimeout(() => {
      if (checkAuth()) {
        setAuthChecked(true);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {
    hasLoadedChat.current = false;
  }, [chatId]);

  useEffect(() => {
    if (!chatId || !currentUser?._id || !authChecked || hasLoadedChat.current) return;

    if (chatId.length !== 24) {
      console.error("❌ Invalid chatId format:", chatId);
      setError("Invalid chat ID format");
      setLoading(false);
      return;
    }

    const fetchChatData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const chatResponse = await api.get(`/chat/${chatId}`);
        setChatInfo(chatResponse.data);
        
        const messagesResponse = await api.get(`/messages/${chatId}`);
        setMessages(messagesResponse.data);
        
        hasLoadedChat.current = true;
        
      } catch (err) {
        console.error("❌ Error fetching chat data:", err);
        setError(err.response?.data?.message || err.message || "Failed to load chat");
        toast.error("Failed to load chat");
      } finally {
        setLoading(false);
      }
    };

    fetchChatData();
  }, [chatId, currentUser?._id, authChecked]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!loading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [loading]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentUser || sending) return;

    try {
      setSending(true);
      const senderType = currentUser.isLawyer ? 'lawyer' : 'user';
      
      const { data } = await api.post(`/messages`, {
        content: newMessage,
        chatId,
        senderId: currentUser._id,
        senderType: senderType,
      });

      setMessages((prev) => [...prev, data]);
      setNewMessage("");
      
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      
    } catch (err) {
      console.error("Error sending message:", err);
      toast.error("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!authChecked) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <div className="container mt-4">Redirecting to login...</div>;
  }

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading chat...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          <h4>Error Loading Chat</h4>
          <p>{error}</p>
          <button 
            className="btn btn-primary" 
            onClick={() => window.location.reload()}
          >
            <i className="fas fa-redo me-2"></i>
            Retry
          </button>
        </div>
      </div>
    );
  }

  const otherParticipant = chatInfo?.user?._id === currentUser._id 
    ? chatInfo?.lawyer 
    : chatInfo?.user;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#f8f9fa', maxWidth: '1000px', margin: '0 auto', boxShadow: '0 0 20px rgba(0,0,0,0.1)' }}>
      {/* Chat Header */}
      <div style={{ background: 'white', borderBottom: '1px solid #e9ecef', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            style={{ background: 'none', border: 'none', color: '#6c757d', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer' }}
            onClick={() => navigate(-1)}
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
            <img 
              src={otherParticipant?.image ? `/uploads/${otherParticipant.image}` : "/assets/website/images/avatar-1.jpg"} 
              alt={otherParticipant?.firstName || "User"}
              style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = "/assets/website/images/avatar-1.jpg";
              }}
            />
            <div>
              <h5 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: '#212529' }}>
                {otherParticipant?.firstName} {otherParticipant?.lastName}
              </h5>
              <span style={{ fontSize: '0.875rem', color: '#6c757d' }}>
                {otherParticipant?.isLawyer ? "Lawyer" : "Client"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', background: '#f8f9fa' }}>
        {messages.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
            <i className="fas fa-comments" style={{ fontSize: '4rem', color: '#dee2e6', marginBottom: '1rem' }}></i>
            <h5>Start a Conversation</h5>
            <p className="text-muted">
              Send a message to begin chatting with {otherParticipant?.firstName}
            </p>
          </div>
        ) : (
          <div>
            {messages.map((msg, idx) => {
              const isOwnMessage = msg.sender._id === currentUser._id;
              const showDate = idx === 0 || 
                new Date(msg.createdAt).toDateString() !== 
                new Date(messages[idx - 1].createdAt).toDateString();
              
              return (
                <div key={msg._id || idx}>
                  {showDate && (
                    <div style={{ textAlign: 'center', margin: '1rem 0' }}>
                      <span style={{ background: 'white', padding: '0.5rem 1rem', borderRadius: '1rem', fontSize: '0.875rem', color: '#6c757d', border: '1px solid #dee2e6' }}>
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '70%', marginBottom: '1rem', alignSelf: isOwnMessage ? 'flex-end' : 'flex-start' }}>
                    <div style={{ fontSize: '0.75rem', color: '#6c757d', marginBottom: '0.25rem', fontWeight: 500 }}>
                      {isOwnMessage ? 'You' : `${msg.sender.firstName} ${msg.sender.lastName}`}
                    </div>
                    <div style={{ 
                      padding: '0.75rem 1rem', 
                      borderRadius: '1rem',
                      background: isOwnMessage ? '#007bff' : 'white',
                      color: isOwnMessage ? 'white' : '#212529',
                      border: isOwnMessage ? 'none' : '1px solid #e9ecef',
                      borderBottomRightRadius: isOwnMessage ? '0.25rem' : '1rem',
                      borderBottomLeftRadius: isOwnMessage ? '1rem' : '0.25rem'
                    }}>
                      <div style={{ marginBottom: '0.25rem', wordWrap: 'break-word', lineHeight: 1.4 }}>
                        {msg.content}
                      </div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.7, textAlign: 'right' }}>
                        {new Date(msg.createdAt).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Message Input */}
      <div style={{ background: 'white', borderTop: '1px solid #e9ecef', padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem', background: '#f8f9fa', borderRadius: '1.5rem', padding: '0.75rem', border: '1px solid #e9ecef' }}>
          <textarea
            ref={inputRef}
            style={{ 
              flex: 1, 
              border: 'none', 
              background: 'transparent', 
              resize: 'none', 
              padding: '0.5rem', 
              fontSize: '0.9rem', 
              outline: 'none', 
              maxHeight: '100px', 
              minHeight: '20px',
              fontFamily: 'inherit'
            }}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            rows="1"
            disabled={sending}
          />
          <button 
            style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              border: 'none', 
              background: newMessage.trim() ? '#007bff' : '#dee2e6', 
              color: newMessage.trim() ? 'white' : '#6c757d', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              cursor: newMessage.trim() && !sending ? 'pointer' : 'not-allowed',
              opacity: (!newMessage.trim() || sending) ? 0.6 : 1,
              transition: 'all 0.3s ease'
            }}
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || sending}
          >
            {sending ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Sending...</span>
              </div>
            ) : (
              <i className="fas fa-paper-plane"></i>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPageNew; 