import React from "react";
import KeyboardBackspaceSharpIcon from "@material-ui/icons/KeyboardBackspaceSharp";
import "./MakeNewLoadMap.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const MakeNewLoadMap: React.FC = () => {
  const history = useHistory();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const { title, description } = event.target.elements;
    console.log(title.value, description.value);
    history.push({
      pathname: "/edit",
      state: {
        title: title.value,
        description: description.value,
      },
    });
  };

  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });
  return (
    <div>
      <IconButton onClick={() => history.push("/")}>
        <KeyboardBackspaceSharpIcon fontSize="large" />
      </IconButton>
      <form onSubmit={handleSubmit} className={"makeNewLoadMapContent"}>
        <div className={"heading"}>新しいロードマップを作成する</div>
        <div className={"input-textField"}>
          <TextField
            id="title"
            label="タイトル"
            type="title"
            autoComplete="current-password"
            variant="outlined"
            className={"title-inputField"}
          />
        </div>
        <div className={"input-textField"}>
          <TextField
            id="description"
            label="詳細"
            type="title"
            autoComplete="current-password"
            variant="outlined"
            fullWidth
          />
        </div>
        <div>
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              color="primary"
              style={{ color: "white", marginTop: 48 }}
              type={"submit"}
            >
              作成
            </Button>
          </ThemeProvider>
        </div>
      </form>
    </div>
  );
};

export default MakeNewLoadMap;
