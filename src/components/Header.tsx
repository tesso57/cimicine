import React from "react";
import "./Header.css";

import logo from "../img/logo.svg";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton, Drawer } from "@material-ui/core";

import { useHistory } from "react-router";
const Menu: React.FC = () => {
  return (
    <div className="header__menu">
      <svg viewBox="0 0 500 500" className="logo">
        <use xlinkHref={`${logo}#logo`} />
      </svg>

      <div className="createButton">
        <div className="buttonContent">
          <NoteAddIcon fontSize="large" className="createMapsIcon" />
          <span>作成</span>
        </div>
      </div>

      <hr className="partition" />

      <div className="hotMaps">
        <div className="hotMapsContent">
          <WhatshotIcon
            style={{ color: "#ff1f1f" }}
            fontSize="large"
            className="hotMapsIcon"
          />
          <span>急上昇のロードマップ</span>
        </div>
      </div>

      <div className="searchMaps">
        <div className="searchMapsContent">
          <SearchIcon
            style={{ color: "#007c40" }}
            fontSize="large"
            className="searchMapsIcon"
          />
          <span>ロードマップを探す</span>
        </div>
      </div>
    </div>
  );
};

const Header: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };
  const history = useHistory();
  return (
    <div className="header">
      <IconButton onClick={() => setOpen(true)}>
        <MenuIcon fontSize="large" />
      </IconButton>

      <div className="logoAndTitle" onClick={() => history.push("/about")}>
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
      <Drawer open={open} anchor="left" onClose={toggleDrawer(false)}>
        <Menu />
      </Drawer>
    </div>
  );
};

export default Header;
