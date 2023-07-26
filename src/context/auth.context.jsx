import React, { useState, useEffect } from "react";
import axios from "axios";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  function storeToken(token) {
    return localStorage.setItem("authToken", token);
  }

  function authenticateUser() {
    const storeToken = localStorage.getItem("authToken"); //recupere le "authToken" dans le local storage
    console.log("storeToken ===>", storeToken);

    if (storeToken) {
      //requete au server {Header: Bearer eyJhb....} --> /api/verify --> return info de la payload
      axios
        .get("http://localhost:5005/api/verify", {
          headers: { Authorization: `Bearer ${storeToken}` },
        })
        .then(function (response) {
          const user = response.data; //payload
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
        })
        .catch(function (error) {
          console.log("error server (fail verify)", error);

          setIsLoggedIn(false);
          setIsLoading(true);
          setUser(null);
        });
    } else {
      //si probleme avec le JWT
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  }

  function removeToken() {
    //supprimer le token du local storage
    localStorage.removeItem("authToken");
  }

  function logOutUser() {
    //suppr le token
    removeToken();
    //on retape "/api/verify" pour une obtenir une error et set les differernt state
    authenticateUser();
  }

  useEffect(function () {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext }; //named-export
