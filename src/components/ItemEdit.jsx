import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import service from "../services/file-upload.service";

import myaxios from "../myaxios";

import styled from "@emotion/styled";

//1 import les data de lobjet
//2 pouvoir les modif
//3 requete .patch et .delete

function ItemEdit() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [ville, setVille] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  const handleNameInput = (event) => setName(event.target.value);
  const handleVilleInput = (event) => setVille(event.target.value);
  const handleDescriptionInput = (event) => setDescription(event.target.value);

  const params = useParams(); // return object { id: '64537283'... }

  /* trouve l'item selectionné */
  useEffect(() => {
    myaxios.get("/api/items").then((response) => {
      setItems(response.data);
    });
  }, []);

  const item = items.find(function (el) {
    return el._id === params.id;
  });

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    console.log("e.target.files[0] ===>", e.target.files);

    service
      .uploadImage(uploadData)
      .then((data) => {
        console.log("response is: ", data);
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(data.fileUrl); //
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  /*Token user*/
  const storeToken = localStorage.getItem("authToken");
  console.log("storeToken additems ===>", storeToken);

  return (
    <ItemStyled>
      {item && (
        <div>
          <img src={item.imageUrl} alt={item.name} />
          <form
            onSubmit={(event) => {
              event.preventDefault();

              axios
                .patch(
                  `http://localhost:5005/api/items/${params.id}`,
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
                  navigate("/user");
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

            <button>Editer mon objet</button>
          </form>
        </div>
      )}
    </ItemStyled>
  );
}

const ItemStyled = styled.div`
  min-height: 60vh;
  margin: 42px;
  border-radius: 42px;
  margin-bottom: 84px;
  color: black;

  .zones {
    display: flex;
    justify-content: space-around;
  }
  img {
    height: 420px;
    width: 210;
    border-radius: 42px;
  }

  input {
    height: 42px;
    width: 189px;
    margin: 30px;
    color: #ef4f67;
    background-color: white;
    border: 1px solid white;
    border-color: #ef4f67;
    border-radius: 42px;
    text-align: center;
    cursor: pointer;
    transition: all 1s ease-out;
  }
`;
export default ItemEdit;
