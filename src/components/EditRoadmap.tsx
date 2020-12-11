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

  const uid = (index: number) => (index * 0.001).toString(36).substring(6);

  const [step, setStep] = React.useState(uid(0));
  const handleOpen = (step: string) => {
    setStep(step);
  };

  const [data, setData] = React.useState<number[]>([0, 1, 2]);
  const handleAdd = (index: number) => {
    const temp = [...data];
    const i = temp.length;
    temp.splice(index + 1, 0, temp.length);
    setData(temp);
    handleOpen(uid(i));
  };

  return (
    <div className="editRoadmap">
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
        {data.map((i) => (
          <Step
            open={uid(i) === step}
            onOpen={() => handleOpen(uid(i))}
            key={i}
            onAdd={() => handleAdd(i)}
          />
        ))}

        <div className="edgePoint finish">
          <p>{title}</p>
          <PauseIcon style={{ color: "var(--cimicine-main)" }} />
        </div>
      </div>
    </div>
  );
};

export default EditRoadmap;
