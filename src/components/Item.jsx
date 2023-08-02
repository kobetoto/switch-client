import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Carousel } from "primereact/carousel";

import myaxios from "../myaxios";

import styled from "@emotion/styled";

function Item() {
  // const [proposeItem, setProposeItem] = useState([]);
  const [items, setItems] = useState([]);
  const [Open, setOpen] = useState(false);
  const [selectRadioBtn, setSelectRadioBtn] = useState(null);

  const { isLoggedIn, user } = useContext(AuthContext); //destructure l'objet retourner par le useContext

  const params = useParams(); // return object { id: '64537283'... }

  //modal
  const validation = () => {
    setOpen(!Open);
  };

  const handleChange = (e) => {
    setSelectRadioBtn(e.target.value === "true");
  };

  /* trouve l'item selectionné */
  useEffect(() => {
    myaxios.get("/api/items").then((response) => {
      setItems(response.data);
    });
  }, []);
  // console.log("items // ===>", items);
  // console.log("user._id ===>", user);
  // console.log("params.id ===>", params.id);
  const item = items.find(function (el) {
    return el._id === params.id;
  });
  console.log(
    "fiche produit de l'item choisit sur la page d'acceuil===>",
    item
  );

  /* filtre les items de l'user connecté pour quils puissent les proposé */
  let UserItemsList; // Définir en dehors du bloc if()
  const arrayUserItemsList = [];

  if (isLoggedIn === true) {
    const UserItems = items.filter((el) => el.user._id === user._id);
    console.log("UserItems==>", UserItems);

    // Créez un tableau d'images à partir des éléments de l'utilisateur
    if (UserItems) {
      const imagesUserItems = UserItems.map((el) => {
        arrayUserItemsList.push(el.imageUrl);
        return {
          src: el.imageUrl,
        };
      });

      console.log("arrayUserItemsList==>", arrayUserItemsList);

      const imageTemplate = (image) => {
        return (
          <div>
            <img
              src={image.src}
              alt={image.alt}
              style={{ width: "100px", height: "100px" }}
            />
          </div>
        );
      };

      /* 🎠🎠🎠 */

      // Définissez votre carrousel ici avec le tableau d'images que vous avez créé
      console.log("imagesUserItems caroussel===>", imagesUserItems);
      UserItemsList = (
        <Carousel
          value={imagesUserItems}
          itemTemplate={imageTemplate}
          circular
          autoplayInterval={3000}
        />
      );
    }
  }
  // if (isLoggedIn === true) {
  //   const UserItems = items.filter((el) => el.user._id === user._id);
  //   console.log("UserItems==>", UserItems);

  //   UserItemsList = UserItems.map(function (el) {
  //     // Remplir à l'intérieur du bloc if
  //     console.log("el UserItemsList  ====>", el);

  //     return (
  //       <div key={el._id} style={{ border: "1px solid pink" }}>
  //         <img src={el.imageUrl} alt={el.name} />
  //       </div>
  //     );
  //   });
  // }

  // const proposeItem = (proposeItem) => {
  //   item.proposedItems.push(proposeItem);
  // };

  return (
    <ItemStyled>
      {item && (
        <div className="zones">
          <img src={item.imageUrl} alt={item.name} />
          <div className="info&btn">
            <div className="info">
              <span>
                <h3>nom </h3>
                <p>{item.name}</p>
              </span>

              <span>
                <h3>ville </h3>
                <p>{item.ville}</p>
              </span>

              <span>
                <h3>description </h3>
                <p>{item.description}</p>
              </span>
            </div>
            {!isLoggedIn && (
              <a href="/signup">
                <button style={{ backgroundColor: "#ef4f67b4" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="44"
                    viewBox="0 -960 960 960"
                    width="44"
                  >
                    <path d="m482-200 114-113-114-113-42 42 43 43q-28 1-54.5-9T381-381q-20-20-30.5-46T340-479q0-17 4.5-34t12.5-33l-44-44q-17 25-25 53t-8 57q0 38 15 75t44 66q29 29 65 43.5t74 15.5l-38 38 42 42Zm165-170q17-25 25-53t8-57q0-38-14.5-75.5T622-622q-29-29-65.5-43T482-679l38-39-42-42-114 113 114 113 42-42-44-44q27 0 55 10.5t48 30.5q20 20 30.5 46t10.5 52q0 17-4.5 34T603-414l44 44ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z" />
                  </svg>
                </button>
              </a>
            )}
            {isLoggedIn && (
              <button onClick={validation}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="44"
                  viewBox="0 -960 960 960"
                  width="44"
                >
                  <path d="m482-200 114-113-114-113-42 42 43 43q-28 1-54.5-9T381-381q-20-20-30.5-46T340-479q0-17 4.5-34t12.5-33l-44-44q-17 25-25 53t-8 57q0 38 15 75t44 66q29 29 65 43.5t74 15.5l-38 38 42 42Zm165-170q17-25 25-53t8-57q0-38-14.5-75.5T622-622q-29-29-65.5-43T482-679l38-39-42-42-114 113 114 113 42-42-44-44q27 0 55 10.5t48 30.5q20 20 30.5 46t10.5 52q0 17-4.5 34T603-414l44 44ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z" />
                </svg>
              </button>
            )}
          </div>

          {!isLoggedIn && (
            <div className="itemList">
              <p>connectez-vous pour échanger des objets</p>
              <p>&</p>
              <p>Ajoutez votre premier objet</p>
              <a href="/signup">
                <button>SIGNUP</button>
              </a>
              <p></p>
              <a href="/login">
                <button>LOGIN</button>
              </a>
            </div>
          )}
          {isLoggedIn && (
            <div className="itemList">
              <h1> vos Objets</h1>
              {UserItemsList && <div>{UserItemsList}</div>}
            </div>
          )}
        </div>
      )}
      {Open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#f46a7e",
              height: "650px",
              width: "700px",
              padding: "42px",
              borderRadius: "24px",
            }}
          >
            <h2
              style={{
                color: "white",
              }}
            >
              etes vous sur de vouloir proposer cet echange?
              <button
                onClick={validation}
                style={{
                  height: "20px",
                  width: "25px",
                  margin: "21px",
                }}
              >
                X
              </button>
            </h2>

            <div className="radiobtn">
              <label>
                <input
                  type="radio"
                  value="true"
                  checked={selectRadioBtn === true}
                  onChange={handleChange}
                />
                OUI
              </label>

              <label>
                <input
                  type="radio"
                  value="false"
                  checked={selectRadioBtn === false}
                  onChange={handleChange}
                />
                NON
              </label>
            </div>
            <div className="switchImg">
              <img
                src={item.imageUrl}
                alt={item.name}
                style={{
                  height: "250px",
                  width: "200px",
                }}
              />

              <button>Switch</button>

              <img
                src={
                  "https://www.pngall.com/wp-content/uploads/14/Loading-PNG-Photo.png"
                }
                alt={item.name}
                style={{
                  height: "250px",
                  width: "200px",
                }}
              />
            </div>
          </div>
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
  .info {
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #80808029;
    border-radius: 21px;
    padding: 42px;
  }

  .info h3 {
    margin-right: 42px;
    text-align: left;
  }

  .info p {
    text-align: center;
    margin-left: 84px;
  }

  .connexion {
    background-color: #ef4f67;
    border-radius: 21px;
    padding: 21px;
  }

  .itemList {
    background-color: #ef4f67;
    border-radius: 21px;
    padding: 21px;
  }

  span {
    display: flex;
    justify-content: space-between;
    //border: 1px solid white;
  }

  img {
    height: 420px;
    width: 210;
    border-radius: 42px;
  }

  button {
    height: 63px;
    width: 105px;
    margin-top: 63px;
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

  .radiobtn label {
    color: white;

    margin: 63px;
  }

  .switchImg {
    margin-top: 121px;
    display: flex;
    flex-direction: center;
    justify-content: space-around;
  }
`;

export default Item;
