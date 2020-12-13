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
import { JsonTypes, StepFormType, StepType, UserType } from "../type";
import { initData } from "../utils/mock";
import { db } from "../firebase";
import { AuthContext } from "../auth/AuthProvider";
import ConfirmDialog from "./ConfirmDialog";

const EditRoadmap: React.FC = () => {
  const history = useHistory();
  !history.location.state && history.push("/create");
  const { title, description } = history.location.state as {
    title: string;
    description: string;
  };

  initData.data.title = title;
  initData.data.description = description;

  const { currentUser } = useContext(AuthContext);

  const [nowOpen, setNowOpen] = React.useState(initData.data.steps[0].uid);
  const [data, setData] = React.useState<StepType[]>(initData.data.steps);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

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

  const uploadFlow = () => {
    const docId = Math.random().toString(32).substring(2);
    if (currentUser !== null) {
      const json: JsonTypes = {
        data: {
          steps: data,
          createdAt: new Date(),
          star: 0,
          title: title,
          description: description,
          uid: docId,
        },
        relationships: {
          author: {
            displayName: currentUser.displayName as string,
            id: currentUser.uid as string,
          },
        },
      };
      db.collection("users")
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            let temp = doc.data() as UserType;
            if (temp !== undefined && json !== undefined) {
              temp.createdRoadmaps.push(json);
              db.collection("users")
                .doc(currentUser.uid)
                .update(temp)
                .catch((error) => alert("EditRoadmap"));
            }
          } else {
            db.collection("users")
              .doc(currentUser.uid)
              .set({ createdRoadmaps: [json], staredList: [] } as UserType)
              .catch((error) => alert("create userCollection error"));
          }
        });
      db.collection("flows")
        .doc(docId)
        .set(json)
        .then((r) => {
          console.log("https://cimicine-flow.web.app/view/" + docId);
          history.push("/");
        });
    }
  };

  return (
    <div className="editRoadmap">
      <div className="nav">
        <div className="nav__backAndTitle">
          <IconButton onClick={() => history.goBack()}>
            <ArrowBackIcon style={{ color: "white" }} />
          </IconButton>
          <h1>{title}</h1>
        </div>
        <IconButton onClick={handleDialogOpen} style={{ marginRight: 16 }}>
          <CloudUploadIcon style={{ color: "white" }} />
        </IconButton>
      </div>
      <div className="edit">
        <div className="edgePoint begin">
          <p>{title}</p>
          <PlayArrowIcon style={{ color: "var(--cimicine-main)" }} />
        </div>
        <div className="border" />
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
                replacedItem.url
                  ? replacedItem.url?.push(changedItem)
                  : (replacedItem.url = [changedItem]);

                console.log(replacedItem);
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

        <ConfirmDialog
          open={dialogOpen}
          handleClose={handleDialogClose}
          setFunc={uploadFlow}
        />
      </div>
    </div>
  );
};

export default EditRoadmap;
