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

interface StepProps {
  open: boolean;
  onOpen: () => void;
  onAdd: () => void;
}
const Step: React.FC<StepProps> = ({ open, onOpen, onAdd }) => {
  const [title, setTitle] = React.useState("");
  const [caption, setCaption] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [bookmark, setBookmark] = React.useState<string[]>([]);

  const register = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setBookmark([...bookmark, url]);
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={5}
            />

            {bookmark.map((d, i) => (
              <div className="step__bookmarkItem">
                <img
                  src={`https://s2.googleusercontent.com/s2/favicons?domain=${d}`}
                  alt={d}
                  key={i}
                  className="step__bookmarkIcon"
                />
                <p className="step__bookmarkUrl">{d}</p>
              </div>
            ))}

            <input
              type="text"
              placeholder="Paste in https://..."
              className="step__urlInput"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              className="step__urlSubmit"
              type="submit"
              onClick={(e) => register(e)}
            >
              ブックマークを追加する
            </button>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Step;
