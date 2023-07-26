import { useState } from "react";

import axios from "axios";

import styled from "@emotion/styled";

function UserPage() {
  //protection de la route: comme pour postman pour une route protegée on doit lui transmettre le Authorization: `Bearer eyAGF...

  //video: numero 230 (1h23)

  const [name, setName] = useState("");

  axios
    .get("http://localhost:5005/api/verify", {
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    })
    .then(function (response) {
      console.log("response.data ===>", response.data);
      setName(response.data.name);
    })
    .catch((err) => console.log(err));

  return (
    <UserPageStyled>
      <h1>hello USERPAGE 👥</h1>
      <p>{name}</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
        nostrum laboriosam debitis maiores sit odio ipsum delectus sapiente
        nesciunt incidunt, vitae minima nulla exercitationem fugiat quasi! Quo
        commodi distinctio autem?
      </p>
    </UserPageStyled>
  );
}

const UserPageStyled = styled.div`
  border: 8px solid #ef4f67;
  border-radius: 42px;
  background-color: #ef4f67;
  color: white;

  h1 {
  }
`;

export default UserPage;
