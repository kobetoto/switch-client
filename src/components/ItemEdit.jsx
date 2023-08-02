import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

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
  // console.log("params.id ===>", params.id);
  const item = items.find(function (el) {
    return el._id === params.id;
  });
  console.log(
    "fiche produit de l'item choisit sur la page d'acceuil===>",
    item
  );

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
`;
export default ItemEdit;
