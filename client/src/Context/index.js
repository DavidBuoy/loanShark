import React, { useState, createContext } from "react";
import { useHistory } from "react-router-dom";

const SharkContext = createContext();
const { Provider } = SharkContext;

const AuthProvider = ({ children }) => {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const userInfo = localStorage.getItem("userInfo");
  const expiresAt = localStorage.getItem("expiersAt");

  const [authState, setAuthState] = useState({
    token,
    expiresAt,
    userInfo: userInfo ? JSON.parse(userInfo) : {},
  });

  const setAuthInfo = ({ token, userInfo, expiresAt }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("expiresAt", expiresAt);

    setAuthState({
      token,
      userInfo,
      expiresAt,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("expiresAt");
    setAuthState({});
    history.push("/login");
  };

  const isAuthenticated = () => {
    if (!authState.token || !authState.expiresAt) {
      return false;
    }
    return new Date().getTime() / 1000 < authState.expiresAt;
  };

  return(
    <Provider
    value={{
      authState,
      setAuthState: (authInfo) => setAuthInfo(authInfo),
      logout,
      isAuthenticated,
    }}
    >
      {children}
    </Provider>
  );
};

export { SharkContext, AuthProvider };