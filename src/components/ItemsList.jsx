import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import myaxios from "../myaxios";
// import service from "../services/file-upload.service";

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

  const itemcards = items.map(function (el) {
    console.log("el ====>", el);
    let date = el.createdAt;
    const dateFormat = dayjs(date).format("DD MMMM");
    console.log("dateFormat ===>", dateFormat);

    return (
      <div key={el._id} style={{ border: "1px solid pink" }}>
        <Link to={`/items/${el._id}`}>
          <img src={el.imageUrl} alt={el.name} />
        </Link>
        <p className="nom">{el.name}</p>
        <p className="user">{el.user.name}</p>
        {/* <p>{el.description}</p> */}
        <p className="date">{dateFormat}</p>
        <p className="ville">{el.ville}</p>
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

  div {
    margin: 42px;
  }

  img {
    height: 226px;
    width: 184px;
    border-radius: 42px;
  }

  p {
    text-align: left;
    margin: 8px;
  }

  .nom,
  .ville {
    font-weight: bold;
  }

  .user,
  .date {
    font-weight: lighter;
  }
`;

export default ItemsList;
