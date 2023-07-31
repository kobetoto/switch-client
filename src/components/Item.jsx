import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

import myaxios from "../myaxios";

import styled from "@emotion/styled";

function Item() {
  const [items, setItems] = useState([]);
  const { isLoggedIn } = useContext(AuthContext); //destructure l'objet retourner par le useContext

  const params = useParams(); // return object { id: '64537283' }

  useEffect(() => {
    myaxios.get("/api/items").then((response) => {
      // console.log("response.data", response.data);
      setItems(response.data);
    });
  }, []);

  console.log("items // ===>", items);
  console.log("params.id ===>", params.id);

  // const user = items.filter(function(el){
  //   if
  // });

  const item = items.find(function (el) {
    console.log("el._id // ===>", el._id);
    return el._id === params.id;
  });

  const UserItems = console.log("item //===>", item);

  return (
    <ItemStyled>
      {item && (
        <div className="zones">
          <div>
            <span>
              <img src={item.imageUrl} alt="" />
            </span>
            <span>
              <h5>nom</h5>
              <p>{item.name}</p>
            </span>

            <span>
              <h5>ville: </h5>
              <p>{item.ville}</p>
            </span>

            <span>
              <h5>description</h5>
              <p>{item.description}</p>
            </span>
          </div>

          {!isLoggedIn && (
            <div className="connexion">
              <p>connectez-vous pour échanger des objets</p>
              <p>Ajoutez votre premier objet</p>
            </div>
          )}
          {isLoggedIn && (
            <div className="itemList">
              <h1> vos Objets</h1>
            </div>
          )}
        </div>
      )}
      {isLoggedIn && (
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="34"
            viewBox="0 -960 960 960"
            width="34"
          >
            <path d="m482-200 114-113-114-113-42 42 43 43q-28 1-54.5-9T381-381q-20-20-30.5-46T340-479q0-17 4.5-34t12.5-33l-44-44q-17 25-25 53t-8 57q0 38 15 75t44 66q29 29 65 43.5t74 15.5l-38 38 42 42Zm165-170q17-25 25-53t8-57q0-38-14.5-75.5T622-622q-29-29-65.5-43T482-679l38-39-42-42-114 113 114 113 42-42-44-44q27 0 55 10.5t48 30.5q20 20 30.5 46t10.5 52q0 17-4.5 34T603-414l44 44ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z" />
          </svg>
        </button>
      )}
    </ItemStyled>
  );
}

const ItemStyled = styled.div`
  height: 400px;
  width: 700px;
  margin-bottom: 42px;
  border: 10px solid #ef4f67;
  border-radius: 42px;
  background-color: #ef4f67;
  color: white;

  h5 {
    color: black;
  }
  .zones {
    display: flex;
    justify-content: space-around;
  }

  .connexion {
    //border: 1px solid green;
  }

  span {
    display: flex;
    //border: 1px solid white;
  }

  img {
    height: 226px;
    width: 184px;
  }

  button {
    height: 42px;
    width: 84px;
    background-color: white;
    text-align: center;
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
`;

export default Item;
