import styled from "@emotion/styled";

function Footer() {
  return (
    <FooterStyled
      styles={`@import url("https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap");
    `}
    >
      <div className="logo">
        <h1>
          <span className="specialFont">S</span>
        </h1>
      </div>

      <div className="links">
        <ul>
          <li>
            {" "}
            <a href="/joinus">Join us</a>
          </li>
          <li>
            {" "}
            <a href="/compliance">Compliance</a>
          </li>
          <li>
            {" "}
            <a href="">Help</a>
          </li>
        </ul>
      </div>

      <div className="social">
        <span>Retrouvez nous sur </span>
        <a href="/">
          <img
            src="https://static.vecteezy.com/system/resources/previews/018/930/745/original/twitter-logo-twitter-icon-transparent-free-free-png.png"
            alt="logo twitter"
          />{" "}
        </a>
        <a href="/">
          <img
            src="https://img.freepik.com/vecteurs-premium/logo-medias-sociaux-gradient-violet_197792-1883.jpg"
            alt="logo insta"
          />
        </a>
        <a href="/">
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="logo github"
          />
        </a>
      </div>

      <p className="design">DESIGN BY KOBE</p>

      <div className="partenaires">
        <img src="" alt="" />
      </div>
    </FooterStyled>
  );
}

const FooterStyled = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap");

  /* border: 1px solid black; */
  display: flex;
  justify-content: space-between;

  a {
    display: flex;
    text-decoration: none;
    color: #ef4f6791;
    margin-bottom: 8px;
  }

  .logo {
    padding: 8px;
    background-color: #ef4f6791;
    border-radius: 200px;
  }

  img {
    height: 42px;
    width: 42px;
  }

  p {
    font-family: "Rock Salt", cursive;
    color: black;
    /* border: 1px solid rgb(255, 0, 0); */
  }
`;

export default Footer;
