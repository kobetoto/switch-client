import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import myaxios from "../myaxios";

import styled from "@emotion/styled";

function Signup() {
  //Relier la valeur a un state et au changement de state() === Controle component
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleNameInput = (event) => setName(event.target.value);
  const handleEmailInput = (event) => setEmail(event.target.value);
  const handlePasswordInput = (event) => setPassword(event.target.value);

  // console.log(`${myaxios}`/api/users"); ====> MYAXIOS???

  return (
    <SignupStyled>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@100;400&family=Calligraffitti&family=Marck+Script&display=swap"
          rel="stylesheet"
        />
      </head>
      <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          axios
            .post("http://localhost:5005/api/users", {
              name: name,
              email: email,
              password: password,
            })
            .then(function (response) {
              console.log("response Signup", response);
              navigate("/login");
            })
            .catch(function (error) {
              setErrorMessage(error.message); //message d'error rendu par le json coté SERVEUR
            });
        }}
      >
        <h1>Inscrit toi ici!</h1>
        <label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="nom d'utilisateur"
            onChange={handleNameInput}
          />
        </label>
        <label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="adresse email"
            onChange={handleEmailInput}
          />
        </label>
        <label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="mot de passe"
            onChange={handlePasswordInput}
          />
        </label>

        <button>SIGNUP</button>
      </form>
    </SignupStyled>
  );
}

const SignupStyled = styled.div`
  height: 100vh;
  font-family: "Be Vietnam Pro", sans-serif;

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
    background: linear-gradient(#ef4f67, #ff8686d9);
    left: -90px;
    top: -5px;
  }
  .shape:last-child {
    background: linear-gradient(to right, #ffab98, #ef4f67);
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

export default Signup;
