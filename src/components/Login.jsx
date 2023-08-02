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
      <div className="background">
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
      <form onSubmit={handleLoginSubmit}>
        <h1>Connection</h1>
        <input
          type="email"
          name="email"
          placeholder="adresse email"
          value={email}
          onChange={handleEmailInput}
        />

        <input
          type="password"
          name="password"
          placeholder="mot de passe"
          value={password}
          onChange={handlePasswordInput}
        />
        <button>LOGIN</button>
      </form>
    </LoginStyled>
  );
}

const LoginStyled = styled.div`
  height: 100vh;

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

  .background {
    width: 430px;
    height: 520px;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
  }
  .background .shape {
    height: 200px;
    width: 200px;
    position: absolute;
    border-radius: 50%;
  }
  .shape:first-child {
    background: linear-gradient(300deg, #ef4f67, #f09e9e);
    left: -90px;
    top: -5px;
  }
  .shape:last-child {
    background: linear-gradient(to left, #f5af9f, #ee3450);
    right: -40px;
    bottom: -190px;
  }

  form {
    height: 520px;
    width: 400px;
    background-color: #ef4f67d9;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 59%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.285);
    box-shadow: 0 0 21px #ef4f67;
    padding: 50px 35px;
  }
  form * {
    font-family: "Poppins", sans-serif;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
  }
`;

export default Login;
