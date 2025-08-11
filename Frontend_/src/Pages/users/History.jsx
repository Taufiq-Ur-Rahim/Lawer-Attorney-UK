import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Utils/Axios";
import { Store } from "../../Utils/Store";
import { toast } from "react-toastify";
import { server_ip } from "../../Utils/Data";

function History() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { UserInfo } = state;

  const [chats, setChats] = useState([]);
  const [hiredLawyers, setHiredLawyers] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('chats');

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

  const currentUser = UserInfo || getCurrentUser();

  // Check if user has paid for this lawyer (this would come from payment system)
  const checkLawyerHired = async (lawyerId) => {
    try {
      if (!currentUser || !currentUser._id) return false;
      
      const response = await api.get(`/payments/status/${currentUser._id}/${lawyerId}`);
      return response.data.isPaid;
    } catch (error) {
      console.error("Error checking payment status:", error);
      return false;
    }
  };

  // Check payment status for all lawyers
  const checkAllLawyersPaymentStatus = async () => {
    if (!chats.length) return;
    
    const hiredSet = new Set();
    for (const chat of chats) {
      if (chat.lawyer?._id) {
        const isHired = await checkLawyerHired(chat.lawyer._id);
        if (isHired) {
          hiredSet.add(chat.lawyer._id);
        }
      }
    }
    setHiredLawyers(hiredSet);
  };

  useEffect(() => {
    if (!currentUser) {
      toast.error("Please login to view history");
      navigate('/login');
      return;
    }

    const fetchChats = async () => {
      try {
        setLoading(true);
        console.log("Fetching chats for user:", currentUser._id);
        const { data } = await api.get(`/chat/user/${currentUser._id}`);
        console.log("Chats received:", data);
        setChats(data);
      } catch (error) {
        console.error("Error fetching chats:", error);
        toast.error("Failed to load chat history");
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [currentUser, navigate]);

  // Check payment status after chats are loaded
  useEffect(() => {
    if (chats.length > 0 && !loading) {
      checkAllLawyersPaymentStatus();
    }
  }, [chats, loading]);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const getLastMessagePreview = (chat) => {
    if (chat.latestMessage) {
      const content = chat.latestMessage.content;
      return content.length > 30 ? content.substring(0, 30) + '...' : content;
    }
    return 'No messages yet';
  };

  const handleChatClick = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  // Check if chat is currently active (recent activity within last 24 hours)
  const isChatActive = (chat) => {
    if (!chat.latestMessage) return false;
    const lastMessageTime = new Date(chat.latestMessage.createdAt);
    const now = new Date();
    const diffInHours = (now - lastMessageTime) / (1000 * 60 * 60);
    return diffInHours < 24;
  };

  // Get hired lawyers (lawyers the user has paid for)
  const getHiredLawyers = () => {
    return chats.filter(chat => hiredLawyers.has(chat.lawyer?._id));
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <h4 className="mb-0">My History</h4>
              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item active">History</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <ul className="nav nav-tabs nav-tabs-custom" role="tablist">
                  <li className="nav-item">
                    <a 
                      className={`nav-link ${activeTab === 'chats' ? 'active' : ''}`}
                      onClick={() => setActiveTab('chats')}
                      style={{ cursor: 'pointer' }}
                    >
                      <i className="fas fa-comments me-2"></i>
                      Chat History
                    </a>
                  </li>
                  <li className="nav-item">
                    <a 
                      className={`nav-link ${activeTab === 'hired' ? 'active' : ''}`}
                      onClick={() => setActiveTab('hired')}
                      style={{ cursor: 'pointer' }}
                    >
                      <i className="fas fa-user-tie me-2"></i>
                      Hired Lawyers
                    </a>
                  </li>
                </ul>

                <div className="tab-content p-3">
                  {activeTab === 'chats' && (
                    <div className="tab-pane active">
                      <h5 className="mb-3">Recent Conversations</h5>
                      {loading ? (
                        <div className="text-center py-4">
                          <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          <p className="mt-2">Loading chat history...</p>
                        </div>
                      ) : chats.length > 0 ? (
                        <div className="list-group list-group-flush">
                          {chats.map((chat) => (
                            <div 
                              key={chat._id} 
                              className="list-group-item list-group-item-action p-3"
                              style={{ 
                                cursor: 'pointer',
                                border: 'none',
                                borderBottom: '1px solid #f0f0f0'
                              }}
                              onClick={() => handleChatClick(chat._id)}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#f8f9fa';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }}
                            >
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 me-3 position-relative">
                                  <img
                                    src={chat.lawyer?.image ? `${server_ip}/${chat.lawyer.image}` : "/assets/website/images/avatar-1.jpg"}
                                    className="rounded-circle"
                                    width="50"
                                    height="50"
                                    alt={chat.lawyer?.firstName || "Lawyer"}
                                    onError={(e) => {
                                      e.target.src = "/assets/website/images/avatar-1.jpg";
                                    }}
                                  />
                                  {isChatActive(chat) && (
                                    <span 
                                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"
                                      style={{ fontSize: '0.6rem' }}
                                    >
                                      Active
                                    </span>
                                  )}
                                </div>
                                <div className="flex-grow-1">
                                  <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                      <h6 className="mb-1 fw-semibold">
                                        {chat.lawyer?.firstName} {chat.lawyer?.lastName}
                                        {hiredLawyers.has(chat.lawyer?._id) && (
                                          <span className="badge bg-primary ms-2" style={{ fontSize: '0.6rem' }}>
                                            Hired
                                          </span>
                                        )}
                                      </h6>
                                      <p className="text-muted mb-0 small">
                                        {getLastMessagePreview(chat)}
                                      </p>
                                    </div>
                                    <div className="text-end">
                                      <small className="text-muted">
                                        {formatTime(chat.updatedAt)}
                                      </small>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-5">
                          <i className="fas fa-comments text-muted" style={{ fontSize: '4rem' }}></i>
                          <h5 className="mt-3">No Conversations</h5>
                          <p className="text-muted">
                            You haven't started any conversations yet.
                          </p>
                          <button 
                            className="btn btn-primary"
                            onClick={() => navigate('/attorneys')}
                          >
                            <i className="fas fa-search me-2"></i>
                            Find a Lawyer
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'hired' && (
                    <div className="tab-pane active">
                      <h5 className="mb-3">Hired Lawyers</h5>
                      {loading ? (
                        <div className="text-center py-4">
                          <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          <p className="mt-2">Loading hired lawyers...</p>
                        </div>
                      ) : getHiredLawyers().length > 0 ? (
                        <div className="row">
                          {getHiredLawyers().map((chat) => (
                            <div key={chat._id} className="col-lg-6 col-xl-4 mb-3">
                              <div className="card">
                                <div className="card-body text-center">
                                  <div className="mb-3 position-relative">
                                    <img
                                      src={chat.lawyer?.image ? `${server_ip}/${chat.lawyer.image}` : "/assets/website/images/avatar-1.jpg"}
                                      className="rounded-circle"
                                      width="80"
                                      height="80"
                                      alt={chat.lawyer?.firstName || "Lawyer"}
                                      onError={(e) => {
                                        e.target.src = "/assets/website/images/avatar-1.jpg";
                                      }}
                                    />
                                    {isChatActive(chat) && (
                                      <span 
                                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"
                                        style={{ fontSize: '0.7rem' }}
                                      >
                                        Active
                                      </span>
                                    )}
                                  </div>
                                  <h6 className="mb-1">
                                    {chat.lawyer?.firstName} {chat.lawyer?.lastName}
                                  </h6>
                                  <p className="text-muted mb-2">
                                    {chat.lawyer?.expertise}
                                  </p>
                                  <p className="text-muted small mb-3">
                                    {chat.lawyer?.practiceArea}
                                  </p>
                                  <div className="d-grid gap-2">
                                    <button 
                                      className="btn btn-primary btn-sm"
                                      onClick={() => handleChatClick(chat._id)}
                                    >
                                      <i className="fas fa-comments me-1"></i>
                                      Continue Chat
                                    </button>
                                    <button 
                                      className="btn btn-outline-secondary btn-sm"
                                      onClick={() => navigate(`/attorney-details?data=${encodeURIComponent(JSON.stringify(chat.lawyer))}`)}
                                    >
                                      <i className="fas fa-user me-1"></i>
                                      View Profile
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-5">
                          <i className="fas fa-user-tie text-muted" style={{ fontSize: '4rem' }}></i>
                          <h5 className="mt-3">No Hired Lawyers</h5>
                          <p className="text-muted">
                            You haven't hired any lawyers yet. Hire a lawyer to see them here.
                          </p>
                          <button 
                            className="btn btn-primary"
                            onClick={() => navigate('/attorneys')}
                          >
                            <i className="fas fa-search me-2"></i>
                            Find a Lawyer
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History; 