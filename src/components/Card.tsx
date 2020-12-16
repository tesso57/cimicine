import React from "react";
import { useHistory } from "react-router-dom";
import { JsonTypes } from "../type";
import "./Card.css";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ShareIcon from "@material-ui/icons/Share";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { Button, IconButton, Tooltip } from "@material-ui/core";

interface CardProps {
  data: JsonTypes;
}
export const Card: React.FC<CardProps> = ({ data }) => {
  const history = useHistory();
  const copyUrl = async () => {
    await navigator.clipboard.writeText(
      `https://cimicice-flow.web.app/view/${data.data.uid}`
    );
  };
  return (
    <div className="card">
      <h2
        className="title"
        style={{ color: "black", opacity: 0.87, fontSize: 18 }}
      >
        {data.data.title}
      </h2>
      <p className="star">★ Star {data.data.star}</p>
      <p className="description">{data.data.description}</p>
      <div className="card__cover">
        <Tooltip title="Copy URL">
          <IconButton style={{ color: "white" }} onClick={copyUrl}>
            <FileCopyIcon style={{ color: "white" }} fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Share">
          <IconButton style={{ color: "white" }}>
            <ShareIcon style={{ color: "white" }} fontSize="small" />
          </IconButton>
        </Tooltip>
        <div className="card__divider"></div>
        <Button
          style={{ border: "1px solid white", color: "white" }}
          onClick={() => history.push(`/view/${data.data.uid}`)}
        >
          show
          <KeyboardArrowRightIcon />
        </Button>
      </div>
    </div>
  );
};
