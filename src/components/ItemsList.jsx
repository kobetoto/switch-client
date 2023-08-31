import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import myaxios from "../myaxios";
// import service from "../services/file-upload.service";

import styled from "@emotion/styled";

function ItemsList(props) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    myaxios.get("/api/items").then((response) => {
      //console.log("response.data", response.data);
      setItems(response.data);
    });
  }, []);

  console.log("items ====", items);

  const itemcards = items.map(function (el) {
    //console.log("el ====>", el);

    /*format de la date*/
    let date = el.createdAt;
    const dateFormat = dayjs(date).format("DD MMMM");
    // console.log("dateFormat ===>", dateFormat);

    return (
      <div key={el._id} style={{}}>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@100;400&family=Calligraffitti&family=Marck+Script&display=swap"
            rel="stylesheet"
          />
        </head>
        <Link to={`/items/${el._id}`}>
          <img src={el.imageUrl} alt={el.name} />
        </Link>
        <div className="info">
          <p className="nom">{el.name}</p>
          <p className="user">{el.user.name}</p>
          {/* <p>{el.description}</p> */}
          <p className="date">{dateFormat}</p>
          <p className="ville">{el.ville}</p>
        </div>
      </div>
    );
  });

  return <ItemsListStyled className="itemsList">{itemcards}</ItemsListStyled>;
}

const ItemsListStyled = styled.div`
  font-family: "Be Vietnam Pro", sans-serif;
  font-weight: lighter;
  color: black;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  border: 1px solid #ef4f67;
  border-radius: 24px;
  background-color: #f4dade;

  div {
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 42px;
    margin-bottom: 13px;
  }

  p {
    text-align: left;
    margin: 5px;
  }

  .info {
    margin-top: 21px;
    width: 124px;
    background-color: #ffabb818;
    border-radius: 24px;
    padding: 13px;
  }

  .nom,
  .ville {
    font-weight: bolder;
  }

  .user,
  .date {
  }

  img {
    height: 160px;
    width: 134px;
    border-radius: 42px;
  }
`;

export default ItemsList;
