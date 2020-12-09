import React from "react";
import "./EditRoadmap.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import AssistantPhotoIcon from "@material-ui/icons/AssistantPhoto";
import PauseIcon from "@material-ui/icons/Pause";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import zIndex from "@material-ui/core/styles/zIndex";

interface EditRoadmapProps {
  title?: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}
const EditRoadmap: React.FC<EditRoadmapProps> = ({
  title = "無題のロードマップ",
  setTitle,
}) => {
  const history = useHistory();
  const sampleText = "The First Step";
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

        <div className="step">
          <AssistantPhotoIcon
            fontSize="large"
            style={{
              color: "var(--cimicine-main",
              backgroundColor: "white",
              padding: "4 0",
              zIndex: 5,
            }}
          />
          <p>{sampleText}</p>
        </div>
        <div className="step">
          <AssistantPhotoIcon
            fontSize="large"
            style={{
              color: "var(--cimicine-main",
              backgroundColor: "white",
              padding: "4 0",
              zIndex: 5,
            }}
          />
          <p>{sampleText}</p>
        </div>
        <div className="step">
          <AssistantPhotoIcon
            fontSize="large"
            style={{
              color: "var(--cimicine-main",
              backgroundColor: "white",
              padding: "4 0",
              zIndex: 5,
            }}
          />
          <p>{sampleText}</p>
        </div>
        <div className="edgePoint finish">
          <p>{title}</p>
          <PauseIcon style={{ color: "var(--cimicine-main)" }} />
        </div>
      </div>
    </div>
  );
};

export default EditRoadmap;
