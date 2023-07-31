import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth.context";

import styled from "@emotion/styled";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [setErrorMessage] = useState("");

  const handleEmailInput = (event) => setEmail(event.target.value);
  const handlePasswordInput = (event) => setPassword(event.target.value);

  const { storeToken, authenticateUser } = useContext(AuthContext); //destructuring de l'objet evoyer par le context (recuperation des functions storeToken, authenticateUser)

  const navigate = useNavigate();

  function handleLoginSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:5005/api/sessions", {
        email: email,
        password: password,
      })
      .then(function (response) {
        //la reponse du serveur === on recup l'authToken (on veut le recuperer et l'enregistrer coté client)

        console.log("JWT ===>", response.data.authToken);

        storeToken(response.data.authToken);

        authenticateUser();

        navigate("/");
      })
      .catch(function (error) {
        console.log("error ===>", error);
        setErrorMessage(error.response.data.message); //message d'error rendu par le json coté SERVEUR
      });
  }

  return (
    <LoginStyled>
      <h1>LOGIN</h1>
      <form onSubmit={handleLoginSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailInput}
        />

        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordInput}
        />
        <button>LOGIN</button>
      </form>
    </LoginStyled>
  );
}

const LoginStyled = styled.div`
  margin-top: 126px;
  margin-bottom: 126px;
  margin-left: 564px;
  height: 300px;
  width: 810px;
  border: 10px solid #ef4f67;
  border-radius: 42px;
  border: 10px solid #ef4f67;
  border-radius: 42px;
  background-color: #ef4f67;
  color: black;

  h1 {
    color: white;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  button {
    height: 42px;
    width: 84px;
    background-color: white;
    color: #ef4f67;
    border-color: #61f300;
    border-radius: 12px;
    cursor: pointer;
    transition: all 1s ease-out;
    border: solid 2px;
  }

  button:hover {
    background-color: #ef4f67;
    color: white;
    border-radius: 42px;
    border-color: white;
    transform: fade();
  }

  input {
    height: 42px;
    width: 189px;
    margin: 30px;
    color: #ef4f67;
    background-color: white;
    border: 1px solid white;
    border-color: white;
    border-radius: 42px;
    text-align: center;
    cursor: pointer;
    transition: all 1s ease-out;
  }

  input:hover {
    background-color: #ef4f67;
    color: white;
    border-radius: 42px;
    border-color: white;
    transform: fade();
  }
`;

export default Login;
