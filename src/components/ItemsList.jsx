import { useState, useEffect } from "react";
import myaxios from "../myaxios";
import { Link } from "react-router-dom";

import styled from "@emotion/styled";

function ItemsList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    myaxios.get("/api/items").then((response) => {
      console.log("response.data", response.data);
      setItems(response.data);
    });
  }, []);

  console.log("items ====", items);

  // [ <div>, <div> ]
  const itemcards = items.map(function (el) {
    console.log("el ====>", el);
    return (
      <div key={el._id} style={{ border: "1px solid pink" }}>
        <Link to={`/items/${el._id}`}>
          <img src={el.img} alt={el.name} />
        </Link>
        <h4>{el.name}</h4>
        <p>{el.user.name}</p>
        <p>{el.ville}</p>
        <p>{el.description}</p>
        <p>{el.createdAt}</p>
      </div>
    );
  });

  return <ItemsListStyled className="itemsList">{itemcards}</ItemsListStyled>;
}

const ItemsListStyled = styled.div`
  color: black;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;

  h4 {
  }
`;

export default ItemsList;
