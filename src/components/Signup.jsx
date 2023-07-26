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
  const [setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleNameInput = (event) => setName(event.target.value);
  const handleEmailInput = (event) => setEmail(event.target.value);
  const handlePasswordInput = (event) => setPassword(event.target.value);

  // console.log(`${myaxios}`/api/users"); ====> MYAXIOS???

  return (
    <SignupStyled>
      <h1>SignUp</h1>
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
        <label>
          User Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleNameInput}
          />
        </label>
        <label>
          email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmailInput}
          />
        </label>
        <label>
          Mot de passe:
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordInput}
          />
        </label>

        <button>LOGIN</button>
      </form>
    </SignupStyled>
  );
}

const SignupStyled = styled.div`
  height: 400px;
  width: 700px;
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
    margin: 30px;
  }
`;

export default Signup;
