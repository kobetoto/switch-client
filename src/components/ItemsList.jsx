import { useState, useEffect } from "react";
import styled from "@emotion/styled";

import myaxios from "../myaxios";

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
    return (
      <div key={el._id} style={{ border: "1px solid pink" }}>
        <a href="">
          <img src={el.img} alt={el.name} />
        </a>
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
