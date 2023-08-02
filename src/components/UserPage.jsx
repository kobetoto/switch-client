import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";

import axios from "axios";
import myaxios from "../myaxios";

import styled from "@emotion/styled";

function UserPage() {
  //protection de la route: comme pour postman pour une route protegée on doit lui transmettre le Authorization: `Bearer eyAGF...

  //video: numero 230 (1h23)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ville, setVille] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([]);

  const { user } = useContext(AuthContext); //destructure l'objet retourner par le useContext

  console.log("use context userpage ===>", user._id); //🚨peut etre que on peut utiliser user._id dans le 1er useEffect🚨

  useEffect(() => {
    myaxios
      .get("api/verify", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then(function (response) {
        setEmail(response.data.email);
        // Récupére l'ID de l'utilisateur à partir du payload du JWT
        const userID = response.data._id;
        // requête pour obtenir les informations supplémentaires
        return axios.get(`http://localhost:5005/api/users/${userID}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
      })
      .then(function (response) {
        console.log("response.data MAJ user ==>", response.data);
        setName(response.data.name);
        setVille(response.data.ville);
        setDescription(response.data.description);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    myaxios.get("/api/items").then((response) => {
      console.log("response.data profil", response.data);
      setItems(response.data);
      console.log("items use effect ===>", items);
    });
  }, []);

  const UserItems = items.filter((el) => el.user._id === user._id);
  console.log("UserItems==>", UserItems);

  const imagesItemsUsers = UserItems.map((el) => {
    return (
      <div key={el._id} className="item">
        <a href={`/itemEdit/${el._id}`}>
          <img src={el.imageUrl} alt={el.name} />
        </a>
        <span className="itemsCard">
          <p>{el.name}</p>
          <p style={{ color: "#ef4f67" }}>switch: {el.proposedItems.length}</p>
        </span>
      </div>
    );
  });

  return (
    <UserPageStyled>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@100;400&family=Calligraffitti&family=Marck+Script&display=swap"
          rel="stylesheet"
        />
      </head>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="48"
        viewBox="0 -960 960 960"
        width="48"
      >
        <path d="M204-418q-21 11-44 5.5T126-439q-13-25-4.5-52t35.5-36l338-114 28 55-319 168Zm46 298v-254l353-186-18-35 220-109 27 55-282 211v318H250Zm50-460q-54 0-92-38t-38-92q0-54 38-92t92-38q54 0 92 38t38 92q0 54-38 92t-92 38Z" />
      </svg>
      <a href="/editProfil">edit profil</a>
      <h1>{name}</h1>
      <div className="description">
        <p>{description}</p>
      </div>
      <div className="info">
        <span>
          <p style={{ color: "#ef4f67" }}>Email</p>
          <p>{email}</p>
        </span>
        <span>
          <p style={{ color: "#ef4f67" }}>Ville</p>
          <p>{ville}</p>
        </span>
        <span>
          <p style={{ color: "#ef4f67" }}>Since</p>
          <p>{ville}</p>
        </span>
      </div>

      <div className="itemList">{imagesItemsUsers}</div>
    </UserPageStyled>
  );
}

const UserPageStyled = styled.div`
  margin-top: 84px;
  height: 100vh;
  background-image: url("https://media.discordapp.net/attachments/961953685947158581/1135924070538563684/backgroundS.png?width=847&height=616");
  color: black;
  font-family: "Be Vietnam Pro", sans-serif;

  h1 {
    margin-bottom: 21px;
  }

  a {
    color: #ef4f67;
    font-size: 13px;
  }

  .info {
    display: flex;
    justify-content: center;
  }
  span {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
    margin: 5%;
  }
  p {
    margin: 0.5%;
  }

  .description {
    text-align: center;
  }

  .itemList {
    background-color: #ef4f67;
    display: flex;
    margin: 10px;
  }
  img {
    margin: 34px;
    margin-bottom: 0.5%;
    height: 168px;
    width: 147px;
    border-radius: 42px;
    border: 0.5px solid #ef4f6719;
  }

  .itemsCard {
    border: 1px solid #ffcad2;
    background-color: white;
    color: #727272;
    width: initial;
  }
  .item {
    margin: 13px;
  }
`;

export default UserPage;
