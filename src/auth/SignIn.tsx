import React, {useContext, useEffect} from "react";
import "./SignIn.css";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import {AuthContext} from "./AuthProvider";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

import "firebase/auth";

const SignIn = ({history}: any) => {
    interface State {
        email: string;
        password: string;
        showPassword: boolean;
    }

    const [values, setValues] = React.useState<State>({
        email: "",
        password: "",
        showPassword: false,
    });

    const handleChange = (prop: keyof State) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const {signin, currentUser} = useContext(AuthContext);

    useEffect(() => {
        if (currentUser) {
            history.push('/')
        }
    }, [currentUser, history])


    const handleSubmit = (event: any) => {
        event.preventDefault();
        signin(values.email, values.password, history);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="signInForm">
                <h1>サインイン</h1>
                <Divider variant="middle"/>
                <TextField
                    name="email"
                    size="small"
                    className="formInput"
                    fullWidth
                    variant="outlined"
                    label="メールアドレス"
                    placeholder="email@example.com"
                    value={values.email}
                    onChange={handleChange("email")}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon fontSize="small"/>
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    name="password"
                    size="small"
                    className="formInput"
                    fullWidth
                    label="パスワード"
                    variant="outlined"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon fontSize="small"/>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button
                    className="signInButton"
                    fullWidth
                    variant="outlined"
                    color="primary"
                    type="submit"
                >
                    サインイン
                </Button>

                <div className="toSignUp">
                    <ArrowRightIcon className="arrowIcon"/>
                    <span>
            アカウントをお持ちでない方は
            <Link to={"/signup"} className="linkStyle">
              こちら
            </Link>
          </span>
                </div>
            </form>
        </div>
    );
};

export default withRouter(SignIn);
