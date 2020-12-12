import React, { useContext } from "react";
import "./EditRoadmap.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Step from "./Step";
import { uid } from "../utils/misc";
import { AuthContext } from "../auth/AuthProvider";

interface EditRoadmapProps {
  title?: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}
interface StepType {
  title: string;
  body?: string;
  url?: string[];
  uid: string;
}
interface JsonTypes {
  data: {
    steps: StepType[];
    createdAt: Date;
  };
  relationships: {
    author: {
      displayName: string;
      id: string;
    };
  };
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
          title: "HTML",
          body: "hoge",
          url: ["twitter.com"],
          uid: `${uid()}`,
        },
        {
          title: "CSS",
          body: "hogehoge",
          url: ["twitter.com"],
          uid: `${uid()}`,
        },
        {
          title: "JavaScript",
          body: "hogehogehoge",
          url: ["twitter.com"],
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
      title: "HOGEE",
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
        {data.map((step, index) => (
          <Step
            open={step.uid === nowOpen}
            onOpen={() => handleOpen(step.uid)}
            key={step.uid}
            onAdd={() => handleAdd(index)}
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
