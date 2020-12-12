import React, { useContext } from "react";
import "./EditRoadmap.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import PauseIcon from "@material-ui/icons/Pause";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Step from "./Step";
import { uid } from "../utils/misc";
import { AuthContext } from "../auth/AuthProvider";
import { JsonTypes, StepFormType, StepType } from "../type";

interface EditRoadmapProps {
  title?: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const EditRoadmap: React.FC<EditRoadmapProps> = ({
  title = "無題のロードマップ",
  setTitle,
}) => {
  const history = useHistory();
  // const { currentUser } = useContext(AuthContext);
  const sampleData: JsonTypes = {
    data: {
      steps: [
        {
          title: "The First Step",
          body: "",
          url: [],
          uid: `${uid()}`,
        },
        {
          title: "The Second Step",
          body: "",
          url: [],
          uid: `${uid()}`,
        },
        {
          title: "The Third Step",
          body: "",
          url: [],
          uid: `${uid()}`,
        },
      ],
      createdAt: new Date(),
    },
    relationships: {
      author: {
        displayName: "displayName",
        id: "23820",
      },
    },
  };

  const [nowOpen, setNowOpen] = React.useState(sampleData.data.steps[0].uid);
  const [data, setData] = React.useState<StepType[]>(sampleData.data.steps);

  const handleOpen = (uid: string) => {
    setNowOpen(uid);
  };
  const handleAdd = (index: number) => {
    const temp = [...data];
    const emptyStep: StepType = {
      title: "",
      uid: `${uid()}`,
    };

    temp.splice(index + 1, 0, emptyStep);
    setData(temp);
    handleOpen(emptyStep.uid);
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
        {data.map((step, index) => {
          const setStep = (changedItem: string, type: StepFormType) => {
            const temp = [...data];
            const replacedItem: StepType = step;
            switch (type) {
              case "title":
                replacedItem.title = changedItem;
                break;
              case "body":
                replacedItem.body = changedItem;
                break;
              case "url":
                replacedItem.url?.push(changedItem);
            }
            temp.splice(index, 1, replacedItem);
            setData(temp);
          };
          return (
            <Step
              open={step.uid === nowOpen}
              onOpen={() => handleOpen(step.uid)}
              key={step.uid}
              onAdd={() => handleAdd(index)}
              step={step}
              setValue={setStep}
            />
          );
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
