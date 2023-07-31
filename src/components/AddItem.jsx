import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import service from "../services/file-upload.service";

import styled from "@emotion/styled";

function AddItem() {
  const [name, setName] = useState("");
  const [ville, setVille] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // const [setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleNameInput = (event) => setName(event.target.value);
  const handleVilleInput = (event) => setVille(event.target.value);
  const handleDescriptionInput = (event) => setDescription(event.target.value);

  // ******** this method handles the file upload ********
  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    console.log("e.target.files[0] ===>", e.target.files);

    service
      .uploadImage(uploadData)
      .then((data) => {
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(data.fileUrl); //
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  /*Context*/ /*ID user*/
  const user = useContext(AuthContext); //consum  destructuring???
  console.log("context add items ===>", user.user._id);
  const { isLoggedIn } = useContext(AuthContext); //destructure l'objet retourner par le useContext

  /*Token user*/
  const storeToken = localStorage.getItem("authToken");
  console.log("storeToken additems ===>", storeToken);

  return (
    <AddItemFormStyled>
      {isLoggedIn && (
        <form
          onSubmit={(event) => {
            event.preventDefault(); // empeche de le rechargemetn de page

            axios
              .post(
                "http://localhost:5005/api/items",
                {
                  name: name,
                  ville: ville,
                  description: description,
                  imageUrl: imageUrl,
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
            <textarea
              type="text"
              name="description"
              value={description}
              placeholder="dites nous en plus sur votre trésor"
              onChange={handleDescriptionInput}
            />
          </label>

          <input type="file" onChange={(e) => handleFileUpload(e)} />

          <button>Ajouter l'objet</button>
        </form>
      )}
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
                imageUrl: imageUrl,
                user: user.user._id,
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
          <textarea
            type="text"
            name="description"
            value={description}
            placeholder="....dites nous en plus sur votre trésor"
            onChange={handleDescriptionInput}
          />
        </label>

        <input type="file" onChange={(e) => handleFileUpload(e)} />

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

  textarea {
    height: 42px;
    width: 189px;
    margin: 30px;
    border: 1px solid white;
    border-color: white;
    background-color: white;
    color: black;
    border-radius: 14px;
    text-align: center;
  }
`;

export default AddItem;
