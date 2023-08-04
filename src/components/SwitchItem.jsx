import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import myaxios from "../myaxios";

import styled from "@emotion/styled";

function SwitchItem() {
  const [items, setItems] = useState([]);
  const [selectItem, setSelectItem] = useState(null);
  const [Open, setOpen] = useState(false);

  const params = useParams();
  let proposedItemsList;

  const handleSelectionChange = (e) => {
    // trouve l'élément qui a le même id que la valeur du bouton radio
    console.log("UserItems ===>", UserItems);
    const item = UserItems.find((item) => item._id === e.target.value);

    // stocke l'élément sélectionné dans l'état
    setSelectItem(item);
  };

  //modal
  const validation = () => {
    setOpen(!Open);
  };

  //recupere la liste des items
  useEffect(() => {
    myaxios.get("/api/items").then((response) => {
      setItems(response.data);
    });
  }, []);

  //trouve l'objet "principal"
  const item = items.find(function (el) {
    return el._id === params.id;
  });

  //trouve les objets proposés
  const proposedItems = items.find(function (el) {
    return el.proposedItems[1] === params.id;
  });

  if (proposedItems) {
    proposedItemsList = proposedItems.map(function (el) {
      return (
        <li key={el._id}>
          <div>
            <img
              src={el.imageUrl}
              alt={el.name}
              style={{ height: "400px", width: "400px" }}
            />
            <input
              type="radio"
              value={el._id}
              onChange={handleSelectionChange}
            />
          </div>
        </li>
      );
    });
  }

  return (
    <SwitchItemStyled>
      {item && (
        <div className="zones">
          <div className="item">
            <h2>{item.name} </h2>
            <img src={item.imageUrl} alt={item.name} />
          </div>
          <div className="info&btn">
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
          </div>

          <div className="itemList">
            <h1> Choisir un objet</h1>
            <ul>{proposedItemsList}</ul>
          </div>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="68"
              viewBox="0 -960 960 960"
              width="68"
            >
              <path d="m346-60-76-130-151-31 17-147-96-112 96-111-17-147 151-31 76-131 134 62 134-62 77 131 150 31-17 147 96 111-96 112 17 147-150 31-77 130-134-62-134 62Zm27-79 107-45 110 45 67-100 117-30-12-119 81-92-81-94 12-119-117-28-69-100-108 45-110-45-67 100-117 28 12 119-81 94 81 92-12 121 117 28 70 100Zm107-341Zm-43 133 227-225-45-41-182 180-95-99-46 45 141 140Z" />
            </svg>
            <h2
              style={{
                color: "white",
                fontSize: "42px",
              }}
            >
              SWITCH VALIDE
            </h2>
            <h2
              style={{
                color: "white",
                fontSize: "42px",
              }}
            >
              ref: 1234
            </h2>

            <p style={{ fontSize: "70px" }}>🎉</p>
            <h4>Un email de confirmation vous a été envoyé</h4>
            <a href="/">retour homepage</a>
          </div>
        </div>
      )}
    </SwitchItemStyled>
  );
}

const SwitchItemStyled = styled.div`
  min-height: 60vh;
  margin: 42px;
  border-radius: 42px;
  margin-bottom: 84px;
  color: black;

  .zones {
    display: flex;
    justify-content: space-between;
  }

  .item {
    background-color: #ef4f67;
    border-radius: 21px;
    padding: 21px;
  }

  .item h2 {
    color: white;
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

  ul {
    padding-left: 0;
    list-style: none;

    display: flex;
    gap: 42px;

    height: 450px;
    width: 450px;
    overflow: auto;
  }
  li {
  }
`;

export default SwitchItem;
