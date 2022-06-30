import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <nav>
        <ul>
          <NavLink
            to="/"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>Accuiel</li>
          </NavLink>
          <NavLink
            to="/coup-de-coeur"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>Favoris</li>
          </NavLink>
        </ul>
      </nav>
      <h1>Films Comas</h1>
    </div>
  );
};

export default Header;
