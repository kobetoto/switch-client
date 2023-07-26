import Categorie from "./Categorie";
import ItemsList from "./ItemsList";

import styled from "@emotion/styled";

function Homepage() {
  return (
    <HomepageStyled className="homepage">
      <Categorie />
      <ItemsList />
    </HomepageStyled>
  );
}

const HomepageStyled = styled.div`
  /* border: 1px solid blue; */
  color: black;
`;

export default Homepage;
