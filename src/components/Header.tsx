import React, { useContext } from "react";
import "./Header.css";
import logo from "../img/logo.svg";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SearchIcon from "@material-ui/icons/Search";

import { IconButton, Drawer } from "@material-ui/core";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import { useHistory } from "react-router";
import Dialog from "./Dialog";
import { auth } from "../firebase/index";
import { AuthContext } from "../auth/AuthProvider";

interface Props {
  drawerClose: () => void;
}

const DrawerMenu = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="header__menu">
      <svg viewBox="0 0 500 500" className="logo">
        <use xlinkHref={`${logo}#logo`} />
      </svg>

      <Dialog
        handleClose={() => {
          setOpen(false);
        }}
        handleOpen={() => {
          setOpen(true);
        }}
        open={open}
        drawerClose={props.drawerClose}
      />

      <hr className="partition" />

      <div className="hotMaps">
        <div className="hotMapsContent">
          <WhatshotIcon
            style={{ color: "#ff1f1f" }}
            fontSize="large"
            className="hotMapsIcon"
          />
          <span>急上昇中のロードマップ</span>
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
  const [open, setOpen] = React.useState<boolean>(false);
  const [dropDownOpen, setDropDownOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);
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

  const handleToggle = () => {
    setDropDownOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setDropDownOpen(false);
  };

  //logout関数
  const signout = () => {
    try {
      auth.onAuthStateChanged((user) => {
        auth.signOut().then(() => {
          history.push("/");
        });
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="header">
      <IconButton onClick={() => setOpen(true)}>
        <MenuIcon fontSize="large" />
      </IconButton>

      <div className="logoAndTitle" onClick={() => history.push("/")}>
        <svg viewBox="0 0 500 500" className="logo">
          <use xlinkHref={`${logo}#logo`} />
        </svg>
        <h1 className="title">Cimicine</h1>
      </div>
      <div style={{ display: "inline" }}>
        {currentUser !== null && (
          <p className={"title"} style={{ fontSize: 20 }}>
            {currentUser.displayName}
          </p>
        )}
        <IconButton
          ref={anchorRef}
          aria-controls={open ? "dropDownMenu" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <AccountCircleIcon
            className="userIcon"
            fontSize="large"
            style={{ color: "#007c40" }}
          />
        </IconButton>
      </div>
      <Popper
        open={dropDownOpen}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        style={{ zIndex: 100 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={dropDownOpen} id="dropDownMenu">
                  <MenuItem
                    onClick={(i) => {
                      handleClose(i);
                      history.push("/profile/" + currentUser.displayName);
                    }}
                  >
                    マイページ
                  </MenuItem>
                  <MenuItem onClick={signout}>サインアウト</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <Drawer open={open} anchor="left" onClose={toggleDrawer(false)}>
        <DrawerMenu drawerClose={() => setOpen(false)} />
      </Drawer>
    </div>
  );
};

export default Header;
