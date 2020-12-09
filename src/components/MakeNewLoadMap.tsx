import React from "react"
import KeyboardBackspaceSharpIcon from '@material-ui/icons/KeyboardBackspaceSharp';
import "./MakeNewLoadMap.css"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {
    createMuiTheme,
    ThemeProvider
} from '@material-ui/core/styles';
import {green} from '@material-ui/core/colors';
import {IconButton} from "@material-ui/core";

const MakeNewLoadMap: React.FC = () => {
    const theme = createMuiTheme({
        palette: {
            primary: green,
        },
    });
    return (
        <div>
            <IconButton>
                <KeyboardBackspaceSharpIcon fontSize="large"/>
            </IconButton>
            <div className={"makeNewLoadMapContent"}>
                <div className={"heading"}>新しいロードマップを作成する</div>
                <div className={"input-textField"}>
                    <TextField
                        id="outlined-password-input"
                        label="タイトル"
                        type="title"
                        autoComplete="current-password"
                        variant="outlined"
                        className={"title-inputField"}
                    />
                </div>
                <div className={"input-textField"}>
                    <TextField
                        id="outlined-password-input"
                        label="詳細"
                        type="title"
                        autoComplete="current-password"
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div>
                    <ThemeProvider theme={theme}>
                        <Button variant="contained" color="primary" style={{color: 'white', marginTop: 48}}>
                            作成
                        </Button>
                    </ThemeProvider>
                </div>
            </div>
        </div>
    )
}

export default MakeNewLoadMap