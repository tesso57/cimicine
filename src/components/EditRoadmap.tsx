import React from "react";
import "./EditRoadmap.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Step from "./Step";

interface EditRoadmapProps {
  title?: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}
const EditRoadmap: React.FC<EditRoadmapProps> = ({
  title = "無題のロードマップ",
  setTitle,
}) => {
  const history = useHistory();
  const [step, setStep] = React.useState((1 * 0.001).toString(36).substring(6));
  const handleOpen = (step: string) => {
    setStep(step);
  };
  return (
    <div>
      <div className="nav">
        <IconButton onClick={() => history.goBack()}>
          <ArrowBackIcon style={{ color: "white" }} />
        </IconButton>
        <h1>{title}</h1>
      </div>
      <div className="edit">
        <div className="edgePoint begin">
          <p>{title}</p>
          <PlayArrowIcon style={{ color: "var(--cimicine-main)" }} />
        </div>
        <div className="border"></div>
        {[1, 2, 3].map((i) => {
          const uid = (i * 0.001).toString(36).substring(6);
          const open = uid === step;
          return <Step open={open} onOpen={() => handleOpen(uid)} key={i} />;
        })}

        <div className="edgePoint finish">
          <p>{title}</p>
          <PauseIcon style={{ color: "var(--cimicine-main)" }} />
        </div>
      </div>
    </div>
  );
};

export default EditRoadmap;
