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
        <button className="dropbtn">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            viewBox="0 -960 960 960"
            width="48"
          >
            <path d="M222-255q63-44 125-67.5T480-346q71 0 133.5 23.5T739-255q44-54 62.5-109T820-480q0-145-97.5-242.5T480-820q-145 0-242.5 97.5T140-480q0 61 19 116t63 109Zm257.814-195Q422-450 382.5-489.686q-39.5-39.686-39.5-97.5t39.686-97.314q39.686-39.5 97.5-39.5t97.314 39.686q39.5 39.686 39.5 97.5T577.314-489.5q-39.686 39.5-97.5 39.5Zm.654 370Q398-80 325-111.5q-73-31.5-127.5-86t-86-127.266Q80-397.532 80-480.266T111.5-635.5q31.5-72.5 86-127t127.266-86q72.766-31.5 155.5-31.5T635.5-848.5q72.5 31.5 127 86t86 127.032q31.5 72.532 31.5 155T848.5-325q-31.5 73-86 127.5t-127.032 86q-72.532 31.5-155 31.5ZM480-140q55 0 107.5-16T691-212q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480-140Zm0-370q34 0 55.5-21.5T557-587q0-34-21.5-55.5T480-664q-34 0-55.5 21.5T403-587q0 34 21.5 55.5T480-510Zm0-77Zm0 374Z" />
          </svg>{" "}
        </button>

        {isLoggedIn && (
          <div className="dropdown-content">
            <a href="/user">Profil</a>
            <a href="/additem">Ajouter Objet</a>
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
