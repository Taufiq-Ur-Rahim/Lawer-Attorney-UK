import ToastContainers from "./Utils/ToastContainer";
import PageNotFound404 from "./Errors/PageNotFound404";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/admin/Dashboard";
import Main from "./Pages/admin/Main";
import WebsiteBase from "./Pages/website/Base";
import Home from "./Pages/website/Home";
import About from "./Pages/website/About";
import Services from "./Pages/website/Services";
import Contact from "./Pages/website/Contact";
import Login from "./Pages/website/Login";
import Registration from "./Pages/website/Registration";  
import Attorneys from "./Pages/website/Attorneys";
import AttorneyDetails from "./Pages/website/AttorneyDetails";
import AdminAttorneyDetails from "./Pages/admin/AttorneyDetails";
import Users from "./Pages/admin/UsersList";
import AttorneysList from "./Pages/admin/AttorneysList";
import TransactionList from "./Pages/admin/TransactionList";
import UserDashboard from "./Pages/users/Dashboard";
import LawyerDashboard from "./Pages/users/LawyerDashboard";
import AdminProtected from "./Security/AdminProtected";
import AttorneyProtected from "./Security/AttorneyProtected";
import Setting from "./Pages/users/Setting";
import ChatPage from "./Pages/website/ChatPage";
import History from './Pages/users/History';

// Protected Route Component for Attorneys
const ProtectedAttorneysRoute = ({ children }) => {
  const userInfo = localStorage.getItem("UserInfo");
  if (!userInfo) {
    window.location.href = '/login';
    return null;
  }
  return children;
};

function App() {
  return (
    <>
      <BrowserRouter>

        {/* ToastContainer */}
        <ToastContainers />

        {/* Routes */}
        <Routes>

          {/* Web Routes */}
          <Route path='/' element={<WebsiteBase><Home/></WebsiteBase>} />
          <Route path='/about' element={<WebsiteBase><About title="Personal information"/></WebsiteBase>} />
          <Route path='/services' element={<WebsiteBase><Services title="Services"/></WebsiteBase>} />
          <Route path='/contact' element={<WebsiteBase><Contact title="Contact Us"/></WebsiteBase>} />
          <Route path='/attorneys' element={
            <ProtectedAttorneysRoute>
              <WebsiteBase><Attorneys title="Attorneys"/></WebsiteBase>
            </ProtectedAttorneysRoute>
          } />
          <Route path='/attorney-details' element={
            <ProtectedAttorneysRoute>
              <WebsiteBase><AttorneyDetails title="Attorney Details"/></WebsiteBase>
            </ProtectedAttorneysRoute>
          } />
          <Route path='/login' element={<WebsiteBase><Login title="Login"/></WebsiteBase>} />
          <Route path='/registration' element={<WebsiteBase><Registration title="Registration"/></WebsiteBase>} /> 
          <Route path='/chat/:chatId' element={<WebsiteBase><ChatPage title="Chat"/></WebsiteBase>} /> 

          {/* User Routes */}
          <Route path='/user/dashboard' element={<AttorneyProtected><Dashboard><LawyerDashboard/></Dashboard></AttorneyProtected>} />
          <Route path='/user/history' element={<AttorneyProtected><WebsiteBase><History/></WebsiteBase></AttorneyProtected>} />
          <Route path='/user/settings' element={<AttorneyProtected><Dashboard><Setting/></Dashboard></AttorneyProtected>} />

          {/* Admin Routes */}
          <Route path='/admin/dashboard' element={<AdminProtected><Dashboard><Main/></Dashboard></AdminProtected>} />
          <Route path='/admin/users-list' element={<AdminProtected><Dashboard><Users/></Dashboard></AdminProtected>} />
          <Route path='/admin/attorneys-list' element={<AdminProtected><Dashboard><AttorneysList/></Dashboard></AdminProtected>} />
          <Route path='/admin/attorneys-details' element={<AdminProtected><Dashboard><AdminAttorneyDetails/></Dashboard></AdminProtected>} />
          <Route path='/admin/transactions-list' element={<AdminProtected><Dashboard><TransactionList/></Dashboard></AdminProtected>} />

        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
