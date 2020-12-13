import React from "react";
import "./Step.css";
import AssistantPhotoIcon from "@material-ui/icons/AssistantPhoto";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
} from "@material-ui/core";
import { StepType } from "../type";

interface StepProps {
  open: boolean;
  onOpen: () => void;
  step: StepType;
}

const StepView: React.FC<StepProps> = ({ open, onOpen, step }) => {
  return (
    <div className="step">
      <AssistantPhotoIcon
        fontSize="large"
        style={{
          color: "var(--cimicine-main)",
          backgroundColor: "white",
          padding: "4 0",
          marginTop: 4,
          zIndex: 5,
          marginLeft: 24,
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
              disabled
            />
          </AccordionSummary>
          <AccordionDetails
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Divider style={{ marginBottom: 8 }} />
            <textarea
              className="step__captionInput"
              value={step.body}
              rows={5}
              disabled
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
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default StepView;
