import React from "react";
import "./Step.css";
import AssistantPhotoIcon from "@material-ui/icons/AssistantPhoto";
import AddIcon from "@material-ui/icons/Add";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Tooltip,
} from "@material-ui/core";
import { StepFormType, StepType } from "../type";

interface StepProps {
  open: boolean;
  onOpen: () => void;
  onAdd: () => void;
  step: StepType;
  setValue: (changedItem: string, type: StepFormType) => void;
}

const Step: React.FC<StepProps> = ({ open, onOpen, onAdd, step, setValue }) => {
  const [url, setUrl] = React.useState("");

  const register = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setValue(url, "url");
    setUrl("");
  };
  return (
    <div className="step">
      <div className="step__addIcon" onClick={onAdd}>
        <Tooltip title="Click to add a Step" placement="right">
          <AddIcon />
        </Tooltip>
      </div>
      <AssistantPhotoIcon
        fontSize="large"
        style={{
          color: "var(--cimicine-main)",
          backgroundColor: "white",
          padding: "4 0",
          marginTop: 4,
          zIndex: 5,
        }}
      />
      <div className="step__accordion">
        <Accordion style={{ boxShadow: "none" }} expanded={open}>
          <AccordionSummary onClick={() => !open && onOpen()}>
            <input
              type="text"
              placeholder="Untitled"
              className="step__titleInput"
              value={step.title}
              onChange={(e) => setValue(e.target.value, "title")}
              disabled={!open}
              autoFocus
            />
          </AccordionSummary>
          <AccordionDetails
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Divider style={{ marginBottom: 8 }} />
            <textarea
              placeholder="Write the description here..."
              className="step__captionInput"
              value={step.body}
              onChange={(e) => setValue(e.target.value, "body")}
              rows={5}
            />

            {step.url &&
              step.url.map((d, i) => (
                <a
                  className="step__bookmarkItem"
                  href={d}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={`https://s2.googleusercontent.com/s2/favicons?domain=${d}`}
                    alt={d}
                    key={i}
                    className="step__bookmarkIcon"
                  />
                  <p className="step__bookmarkUrl">{d}</p>
                </a>
              ))}

            <form className="step__urlForm">
              <input
                type="text"
                placeholder="Paste in https://..."
                className="step__urlInput"
                value={url}
                onChange={(e) => setValue(e.target.value, "url")}
              />
              <button
                className="step__urlSubmit"
                type="submit"
                onClick={register}
              >
                ブックマークを追加する
              </button>
            </form>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Step;
