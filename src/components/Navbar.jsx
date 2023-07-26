import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

import "../css/Nav.css";

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext); //destructure l'objet retourner par le useContext

  return (
    <nav>
      <div className="logo">
        <h1>
          <a href="/">
            <span className="specialFont">S</span>witch
          </a>
        </h1>
      </div>

      <div className="searchbar">
        {/* SELECT GRADE*/}
        <label className="select" htmlFor="slct">
          <select id="slct" required>
            <option value="" disabled selected>
              Grade
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <svg>
            <use></use>
          </svg>
        </label>
        <svg className="sprites">
          <symbol id="select-arrow-down" viewBox="0 0 10 6">
            <polyline points="1 1 5 5 9 1"></polyline>
          </symbol>
        </svg>

        {/* SELECT VILLES*/}
        <label className="select" htmlFor="slct">
          <select id="slct" required>
            <option value="" disabled selected>
              Villes
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

        {/* SEARCH BAR*/}
        <div className="search">
          <input type="search" placeholder="Recherche..."></input>
        </div>
      </div>

      {/* MENU DEROULANT */}
      <div className="dropdown">
        <button className="dropbtn"> 👤 </button>

        {isLoggedIn && (
          <div className="dropdown-content">
            <a href="/user">Profil</a>
            <a href="/user">Ajouter Objet</a>
            <a href="/joinus">Aide</a>
            <button
              onClick={() => {
                logOutUser();
              }}
            >
              Deconnexion
            </button>
          </div>
        )}

        {!isLoggedIn && (
          <div className="dropdown-content">
            <a href="/login">Connexion</a>
            <a href="/signup">Inscription</a>
            <a href="/joinus">Aide</a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
