import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Create a new context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const [showContactDetails, setShowContactDetails] = useState(false);

  const [loggedIn, setLoggedIn] = useState(currentUser === null ? false : true);

  const [buyer, setBuyer] = useState(
    currentUser === null
      ? false
      : currentUser.profile === "Buyer"
      ? true
      : false
  );

  const [seller, setSeller] = useState(
    currentUser === null
      ? false
      : currentUser.profile === "Seller"
      ? true
      : false
  );

  const logout = () => {
    sessionStorage.removeItem("user");
    setCurrentUser(null);
    setBuyer(false);
    setSeller(false);
    setLoggedIn(false);
    setShowContactDetails(false);
    Swal.fire({
      icon: "success",
      title: "Logged out successfully",
      text: "Thank you for visiting us!",
    });
    // navigate('/home');
  };

  return (
    <UserContext.Provider
      value={{ currentUser,setCurrentUser, seller, buyer, loggedIn, setLoggedIn, logout, setSeller, setBuyer, showContactDetails, setShowContactDetails}}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export default useUserContext;
