import React from "react";
import "./Header.css";

import logo from "../img/logo.svg";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Header: React.FC = () => {
  const history = useHistory();
  return (
    <div className="header">
      <IconButton >
        <MenuIcon fontSize="large" />
      </IconButton>

      <div className="logoAndTitle" onClick={() => history.push("/")}>
        <svg viewBox="0 0 500 500" className="logo">
          <use xlinkHref={`${logo}#logo`} />
        </svg>
        <h1 className="title">Cimicine</h1>
      </div>
      <IconButton>
        <AccountCircleIcon
          className="userIcon"
          fontSize="large"
          style={{ color: "#007c40" }}
        />
      </IconButton>
    </div>
  );
};

export default Header;
