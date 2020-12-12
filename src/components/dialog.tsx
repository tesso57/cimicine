import React, {useEffect, useState} from "react"
import Modal from '@material-ui/core/Modal';
import "./dialog.css"
import TextField from '@material-ui/core/TextField';
import PlayCircleFilledSharpIcon from '@material-ui/icons/PlayCircleFilledSharp';
import PauseCircleFilledSharpIcon from '@material-ui/icons/PauseCircleFilledSharp';
import {IconButton} from "@material-ui/core";
import Visualizer from "./visualizer";
import NoteAddIcon from "@material-ui/icons/NoteAdd";

interface Props {
    handleClose: () => void
    handleOpen: () => void
    open: boolean
}

const Dialog = (props: Props) => {

    const [isStart, setStart] = useState<boolean>(false);
    useEffect(() => {
        if (!props.open) {
            setStart(false)
        }
    }, [props.open])
    return (
        <div>
            <div className="createButton" onClick={props.handleOpen}>
                <div className="buttonContent">
                    <NoteAddIcon fontSize="large" className="createMapsIcon"/>
                    <span>作成</span>
                </div>
            </div>

            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className={"dialog-content"}>
                    <Visualizer isStart={isStart} class={"dialog-canvas"}/>
                    <div className={"dialog-title"}>
                        <TextField
                            InputProps={{
                                'aria-label': 'naked',
                                disableUnderline: true,
                                style: {
                                    color: `#a5a5a5`,
                                    fontSize: 20
                                }
                            }}
                            placeholder={"Untitled"}

                        />
                    </div>

                    <div className={"dialog-caption"}>
                        <TextField
                            fullWidth={true}
                            multiline
                            rowsMax={4}
                            InputProps={{
                                'aria-label': 'naked',
                                disableUnderline: true,
                                style: {
                                    color: `#a5a5a5`,
                                    fontSize: 12
                                }
                            }}
                            placeholder={"Enter the Caption here..."}
                        />
                    </div>
                    <div className={"dialog-icon"}>
                        <IconButton onClick={() => setStart(!isStart)} style={{color: 'white'}}>
                            {(isStart) ? (
                                <PauseCircleFilledSharpIcon fontSize={"large"}/>

                            ) : (
                                <PlayCircleFilledSharpIcon fontSize="large"/>
                            )}

                        </IconButton>
                    </div>
                </div>
            </Modal>
        </div>
    )
}


export default Dialog;