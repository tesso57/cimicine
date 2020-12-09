import React from "react";
import "./Header.css";

import logo from "../img/logo.svg"
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function Header() {
  return (
    <div className="header">
      <MenuIcon className="menuIcon" style={{ width: '24px', height: 'auto' }}/>
      <div className="logoAndTitle">
        <svg viewBox="0 0 500 500" className="logo">
            <use xlinkHref={`${logo}#logo`} />
          </svg>
        <h1 className="title">Cimicine</h1>
      </div>
      <AccountCircleIcon style={{ color: '#007c40', width: '38px', height: 'auto' }} className="userIcon" />
    </div>
  )
}

export default Header;
