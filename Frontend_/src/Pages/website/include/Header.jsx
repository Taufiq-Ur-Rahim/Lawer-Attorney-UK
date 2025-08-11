import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Store } from '../../../Utils/Store';
import { toast } from 'react-toastify';

function Header() {
  const { state, dispatch } = useContext(Store)
  const { UserInfo, ContactInfo } = state
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("UserInfo");
    localStorage.removeItem("Admin");
    
    // Update store state
    dispatch({ type: "ClearUserInfo" });
    
    // Show success message
    toast.success("Logged out successfully");
    
    // Redirect to home page
    navigate('/');
  };

  // Get user info from localStorage as fallback
  const getCurrentUser = () => {
    try {
      const userFromStorage = localStorage.getItem("UserInfo");
      return userFromStorage ? JSON.parse(userFromStorage) : null;
    } catch (error) {
      return null;
    }
  };

  const currentUser = UserInfo || getCurrentUser();

  return (
    <>
      <div
        className="navbar custom-navbar wow fadeInDown"
        data-wow-duration="2s"
        role="navigation"
      >
        <div className="container">
          {/* NAVBAR HEADER */}
          <div className="navbar-header">
            <button
              className="navbar-toggle"
              data-toggle="collapse"
              data-target=".navbar-collapse"
            >
              {" "}
              <span className="icon icon-bar" /> <span className="icon icon-bar" />{" "}
              <span className="icon icon-bar" />{" "}
            </button>
            {/* lOGO TEXT HERE */}
            <Link to="/" className="navbar-brand">
              <img src="/assets/website/images/logo-color.png" alt="" />
            </Link>{" "}
          </div>
          {/* NAVIGATION LINKS */}
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li className={location.pathname === '/' ? 'active' : ''}>
                <Link to="/">Home</Link>
              </li>
              <li className={location.pathname === '/attorneys' ? 'active' : ''}>
                <Link to="/attorneys">Attorneys</Link>
              </li>

              <li className={location.pathname === '/services' ? 'active' : ''}>
                <Link to="/services">Services</Link>
              </li>
              <li className={location.pathname === '/about' ? 'active' : ''}>
                <Link to="/about">About</Link>
              </li>
              <li className={location.pathname === '/contact' ? 'active' : ''}>
                <Link to="/contact">Contact</Link>
              </li>

              {currentUser ? (
                <>
                  {currentUser.isAdmin ? (
                    <li className={location.pathname === '/admin/dashboard' ? 'active' : ''}>
                      <Link to="/admin/dashboard">Admin Dashboard</Link>
                    </li>
                  ) : currentUser.isLawyer ? (
                    <li className={location.pathname === '/user/dashboard' ? 'active' : ''}>
                      <Link to="/user/dashboard">Lawyer Dashboard</Link>
                    </li>
                  ) : (
                    <>
                      
                      <li className={location.pathname === '/user/history' ? 'active' : ''}>
                        <Link to="/user/history">My History</Link>
                      </li>
                    </>
                  )}
                  <li>
                    <span style={{ color: '#007bff', fontWeight: 'bold', padding: '15px 15px', display: 'inline-block' }}>
                      Welcome, {currentUser.firstName}!
                    </span>
                  </li>
                  <li>
                    <Link 
                      to="#"
                      onClick={handleLogout}
                      style={{
                        color: '#dc3545',
                        padding: '15px 15px',
                        display: 'inline-block',
                        textDecoration: 'none',
                        fontWeight: '500',
                        transition: 'color 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#c82333';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = '#dc3545';
                      }}
                    >
                      <i className="fa fa-sign-out me-1"></i> 
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <li className={location.pathname === '/login' ? 'active' : ''}>
                  <Link to="/login">Login</Link>
                </li>
              )}

              <li>
                <span className="calltxt">
                  <i className="fa fa-phone" aria-hidden="true" /> {ContactInfo.contact_phone}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header