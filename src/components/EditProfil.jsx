import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import styled from "@emotion/styled";

function EditProfil() {
  //Relier la valeur a un state et au changement de state() === Controle component
  const [name, setName] = useState("");
  const [ville, setVille] = useState("");
  const [description, setDescription] = useState("");
  const [actualName, setActualName] = useState("");
  const [actualVille, setActualVille] = useState("");
  const [actualDescription, setActualDescription] = useState("");

  const navigate = useNavigate();

  const handleNameInput = (event) => setName(event.target.value);
  const handleVilleInput = (event) => setVille(event.target.value);
  const handleDescriptionInput = (event) => setDescription(event.target.value);

  const user = useContext(AuthContext); //consum  destructuring???
  const userID = user.user._id;
  console.log("ID user edit ===>", userID);

  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/users/${userID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((res) => {
        console.log("res.data (userEdit) ===>", res.data);
        setActualName(res.data.name);
        setActualVille(res.data.ville);
        setActualDescription(res.data.description);
      })
      .catch((err) => console.log("err (userEdit) ===>", err));
  });

  return (
    <EditProfilStyled>
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
            .patch(`http://localhost:5005/api/users/${userID}`, {
              name: name,
              ville: ville,
              description: description,
            })
            .then(function (response) {
              console.log("response userEdit", response.data);
              navigate("/user");
            })
            .catch(function (error) {
              console.log(error.message); //message d'error rendu par le json coté SERVEUR
            });
        }}
      >
        <h1>Edit Profil</h1>
        <label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder={`${actualName}`}
            onChange={handleNameInput}
          />
        </label>
        <label className="select">
          <select name="ville" value={ville} onChange={handleVilleInput}>
            <option value="" disabled selected>
              {`${actualVille}`}
            </option>
            <option value="Paris">Paris</option>
            <option value="Clamart">Clamart</option>
            <option value="Issy-les-Moulineaux">Issy-les-Moulineaux</option>
            <option value="Creteil">Creteil</option>
          </select>
        </label>
        <svg className="sprites">
          <symbol id="select-arrow-down" viewBox="0 0 10 6">
            <polyline points="1 1 5 5 9 1"></polyline>
          </symbol>
        </svg>
        <label>
          <textarea
            type="text"
            name="description"
            value={description}
            placeholder={`${actualDescription}`}
            onChange={handleDescriptionInput}
          />
        </label>
        <button>Edit</button>
      </form>
    </EditProfilStyled>
  );
}

const EditProfilStyled = styled.div`
  background-image: url("https://media.discordapp.net/attachments/961953685947158581/1135924070538563684/backgroundS.png?width=847&height=616");

  height: 100vh;
  font-family: "Be Vietnam Pro", sans-serif;
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

  input,
  textarea {
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
    left: -250px;
    top: -150px;
  }
  .shape:last-child {
    background: linear-gradient(to right, #ffab98, #ef4f67);
    right: -210px;
    bottom: -90px;
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .background {
    position: relative;
  }

  .shape {
    width: 50px;
    height: 50px;
    background-color: #f00;
    position: absolute;
    animation: rotate 2s linear infinite; /* animation-name, animation-duration, animation-timing-function, animation-iteration-count */
  }

  .shape:nth-child(2) {
    animation-delay: 1s; /* Début de l'animation après un délai, pour que les deux div ne tournent pas en même temps */
  }

  form {
    height: 620px;
    width: 700px;
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

export default EditProfil;
