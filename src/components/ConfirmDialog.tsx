import React from "react";
import "./ConfirmDialog.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface Props {
  open: boolean;
  handleClose: () => void;
  setFunc: () => void;
}

const ConfirmDialog = (props: Props) => {
  const handleUpload = () => {
    props.setFunc();
    props.handleClose();
  };

  return (
    <div className="confirmDialog">
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"作成したロードマップをアップロードしますか？"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            アップロードされたロードマップはすべてのユーザーに公開されます。
            アップロードボタンを押すとトップページに移動します。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>キャンセル</Button>
          <Button
            className="uploadButton"
            onClick={handleUpload}
            variant="contained"
            autoFocus
          >
            アップロード
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
