import React from "react";
import "./EditRoadmap.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import { Checkbox, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import StepView from "./StepView";
import { JsonTypes } from "../type";
import { Star, StarOutline } from "@material-ui/icons";

interface ViewRoadmapProps {
  json: JsonTypes;
}
const ViewRoadmap: React.FC<ViewRoadmapProps> = ({ json }) => {
  const { data } = json;
  const steps = data.steps;
  const history = useHistory();
  const [nowOpen, setNowOpen] = React.useState(data.steps[0].uid);
  const handleOpen = (uid: string) => {
    setNowOpen(uid);
  };

  return (
    <div className="editRoadmap">
      <div className="nav">
        <div className="nav__backAndTitle">
          <IconButton onClick={() => history.goBack()}>
            <ArrowBackIcon style={{ color: "white" }} />
          </IconButton>
          <h1>{data.title}</h1>
        </div>
        <Checkbox
          icon={<StarOutline style={{ color: "white" }} />}
          checkedIcon={<Star style={{ color: "yellow" }} />}
          style={{ marginRight: 16 }}
        />
      </div>
      <div className="edit">
        <div className="edgePoint begin">
          <p>{data.title}</p>
          <PlayArrowIcon style={{ color: "var(--cimicine-main)" }} />
        </div>
        <div className="border" />
        {steps.map((step) => (
          <StepView
            open={step.uid === nowOpen}
            onOpen={() => handleOpen(step.uid)}
            key={step.uid}
            step={step}
          />
        ))}

        <div className="edgePoint finish">
          <p>{data.title}</p>
          <PauseIcon style={{ color: "var(--cimicine-main)" }} />
        </div>
      </div>
    </div>
  );
};

export default ViewRoadmap;
