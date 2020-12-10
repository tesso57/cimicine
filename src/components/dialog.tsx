import React from "react"
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import "./dialog.css"
import TextField from '@material-ui/core/TextField';

interface Props {
    handleClose: () => void
    handleOpen: () => void
    open: boolean
}

const Dialog = (props: Props) => {

    return (
        <div>
            <button type="button" onClick={props.handleOpen}>
                Open Modal
            </button>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className={"dialog-content"}>

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

                </div>
            </Modal>
        </div>
    )
}


export default Dialog;