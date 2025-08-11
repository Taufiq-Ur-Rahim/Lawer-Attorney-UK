import { createContext, useReducer } from "react";
import { ContactInfo } from "./Data";

export const Store = createContext();

const initialState = {
  UserInfo: (() => {
    try {
      const userInfo = localStorage.getItem("UserInfo");
      return userInfo ? JSON.parse(userInfo) : null;
    } catch (error) {
      console.error("Error parsing UserInfo from localStorage:", error);
      return null;
    }
  })(),

  Admin: (() => {
    try {
      const adminInfo = localStorage.getItem("Admin");
      return adminInfo ? JSON.parse(adminInfo) : null;
    } catch (error) {
      console.error("Error parsing Admin from localStorage:", error);
      return null;
    }
  })(),

  ContactInfo: (() => {
    try {
      const contactInfo = localStorage.getItem("ContactInfo");
      return contactInfo ? JSON.parse(contactInfo) : ContactInfo;
    } catch (error) {
      console.error("Error parsing ContactInfo from localStorage:", error);
      return ContactInfo;
    }
  })(),
};

function reducer(state, action) {
  switch (action.type) {
    case "UserLoggedIn":
      localStorage.setItem("UserInfo", JSON.stringify(action.payload));
      return { ...state, UserInfo: action.payload };

    case "LawyerLogout":
      localStorage.removeItem("UserInfo");
      localStorage.removeItem("Project");
      return { ...state, UserInfo: null, Project: null };
      
    case "ClearUserInfo":
      localStorage.removeItem("UserInfo");
      return { ...state, UserInfo: null };

    case "Admin":
      localStorage.setItem("Admin", JSON.stringify(action.payload));
      return { ...state, Admin: action.payload };

    case "update":
      localStorage.setItem("UserInfo", JSON.stringify(action.payload));
      return { ...state, UserInfo: action.payload };

    case "ResetUserInfo":
      localStorage.removeItem("UserInfo");
      return { ...state, UserInfo: null };

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}> {props.children} </Store.Provider>;
}
