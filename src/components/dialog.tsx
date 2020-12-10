import React from "react"
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

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
                <div>
                    <h2 id="simple-modal-title">Text in a modal</h2>
                    <p id="simple-modal-description">
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </p>
                </div>
            </Modal>
        </div>
    )
}


export default Dialog;