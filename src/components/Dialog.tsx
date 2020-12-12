import React, { useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";
import "./Dialog.css";
import TextField from "@material-ui/core/TextField";
import PlayCircleFilledSharpIcon from "@material-ui/icons/PlayCircleFilledSharp";
import PauseCircleFilledSharpIcon from "@material-ui/icons/PauseCircleFilledSharp";
import { IconButton } from "@material-ui/core";
import Visualizer from "./visualizer";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import Button from "@material-ui/core/Button";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

interface Props {
  handleClose: () => void;
  handleOpen: () => void;
  open: boolean;
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#007c40",
    },
  },
});

const Dialog = (props: Props) => {
  const [isStart, setStart] = useState<boolean>(false);
  const history = useHistory();

  const validateRequired = (property: any, message: string) => {
    const err = property === "" || property === null ? [message] : null;
    return err;
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("title", event.target.title.value);
    console.log("caption", event.target.caption.value);
    const isValidateTitle = validateRequired(
      event.target.title.value,
      "タイトルがありません"
    );
    const isValidateCaption = validateRequired(
      event.target.caption.value,
      "説明文がありません"
    );
    if (isValidateTitle !== null) {
      alert(isValidateTitle);
      setStart(false);
    }
    if (isValidateCaption !== null) {
      alert(isValidateCaption);
      setStart(false);
    }
  };

  useEffect(() => {
    if (!props.open) {
      setStart(false);
    }
  }, [props.open]);
  return (
    <div>
      <div className={"createButton"}>
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={"buttonContent"}
            startIcon={<NoteAddIcon fontSize={"large"} />}
            // onClick={props.handleOpen}
            onClick={() => {
              props.handleClose();
              history.push("/create");
            }}
            style={{ color: "white" }}
          >
            作成
          </Button>
        </ThemeProvider>
      </div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <form onSubmit={handleSubmit} className={"dialog-content"}>
          <Visualizer isStart={isStart} class={"dialog-canvas"} />
          <div className={"dialog-title"}>
            <TextField
              InputProps={{
                "aria-label": "naked",
                disableUnderline: true,
                style: {
                  color: `#a5a5a5`,
                  fontSize: 20,
                },
              }}
              placeholder={"Untitled"}
              name={"title"}
            />
          </div>
          <div className={"dialog-caption"}>
            <TextField
              fullWidth={true}
              multiline
              rowsMax={4}
              InputProps={{
                "aria-label": "naked",
                disableUnderline: true,
                style: {
                  color: `#a5a5a5`,
                  fontSize: 12,
                },
              }}
              placeholder={"Enter the Caption here..."}
              name={"caption"}
            />
          </div>
          <div className={"dialog-icon"}>
            <IconButton
              type={"submit"}
              onClick={() => setStart(!isStart)}
              style={{ color: "white" }}
            >
              {isStart ? (
                <PauseCircleFilledSharpIcon fontSize={"large"} />
              ) : (
                <PlayCircleFilledSharpIcon fontSize="large" />
              )}
            </IconButton>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default Dialog;
