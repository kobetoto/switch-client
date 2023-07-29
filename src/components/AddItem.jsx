import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";

import styled from "@emotion/styled";

function AddItem() {
  const [name, setName] = useState("");
  const [ville, setVille] = useState("");
  const [description, setDescription] = useState("");
  const [setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleNameInput = (event) => setName(event.target.value);
  const handleVilleInput = (event) => setVille(event.target.value);
  const handleDescriptionInput = (event) => setDescription(event.target.value);

  /*Context*/ /*ID user*/
  const user = useContext(AuthContext); //consum  destructuring???
  //console.log("context add items ===>", user.user._id);
  const { isLoggedIn } = useContext(AuthContext); //destructure l'objet retourner par le useContext

  /*Token user*/
  const storeToken = localStorage.getItem("authToken");
  console.log("storeToken additems ===>", storeToken);

  return (
    <AddItemFormStyled>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          axios
            .post(
              "http://localhost:5005/api/items",
              {
                name: name,
                ville: ville,
                description: description,
              },
              {
                headers: {
                  Authorization: `Bearer ${storeToken}`,
                },
              }
            )
            .then(function (response) {
              console.log("response addItem", response);
              navigate("/");
            })
            .catch(function (error) {
              console.log(error); //setErrorMessage(error.message); message d'error rendu par le json coté SERVEUR
            });
        }}
      >
        <label>
          Nom
          <input
            type="text"
            name="name"
            value={name}
            placeholder="nom de l'objet"
            onChange={handleNameInput}
          />
        </label>
        <label>
          Ville
          <input
            type="text"
            name="ville"
            value={ville}
            placeholder="ville où se fera le switch"
            onChange={handleVilleInput}
          />
        </label>
        <label>
          Description
          <input
            type="text"
            name="description"
            value={description}
            placeholder="dites nous en plus sur votre trésor"
            onChange={handleDescriptionInput}
          />
        </label>

        <button>Ajouter l'objet</button>
      </form>
    </AddItemFormStyled>
  );
}

const AddItemFormStyled = styled.div`
  height: 400px;
  width: 700px;
  margin-bottom: 42px;
  border: 10px solid #ef4f67;
  border-radius: 42px;
  background-color: #ef4f67;
  color: white;

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

export default AddItem;
