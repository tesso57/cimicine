import React, {useContext, useEffect} from "react";
import "./SignUp.css";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import {AuthContext} from "./AuthProvider";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import EmailIcon from "@material-ui/icons/Email";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LockIcon from "@material-ui/icons/Lock";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import "firebase/auth";

const SignUp = ({history}: any) => {
    interface State {
        username: string;
        email: string;
        password: string;
        passwordConfirm: string;
        showPassword: boolean;
        showPasswordConfirm: boolean;
    }

    const [values, setValues] = React.useState<State>({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
        showPassword: false,
        showPasswordConfirm: false,
    });
    const [validity, setValidity] = React.useState(false);

    const handleChange = (prop: keyof State) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setValues({...values, [prop]: event.target.value});
    };

    useEffect(() => {
        setValidity(
            (() => {
                if (
                    values.password !== values.passwordConfirm ||
                    values.password.length === 0 ||
                    values.passwordConfirm.length === 0
                )
                    return false;

                return true;
            })()
        );
    }, [values.password, values.passwordConfirm]);

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleClickShowPasswordConfirm = () => {
        setValues({...values, showPasswordConfirm: !values.showPasswordConfirm});
    };

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const {signup, currentUser} = useContext(AuthContext);

    useEffect(() => {
        if (currentUser) {
            history.push("/");
        }
    }, [currentUser, history]);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        signup(values.email, values.password,values.username, history);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="signUpForm">
                <h1>サインアップ</h1>
                <Divider variant="middle"/>
                <TextField
                    name="username"
                    size="small"
                    className="formInput"
                    fullWidth
                    variant="outlined"
                    label="ユーザーネーム"
                    value={values.username}
                    onChange={handleChange("username")}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountBoxIcon fontSize="small"/>
                            </InputAdornment>
                        ),
                    }}
                />
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

                <TextField
                    name="passwordConfirm"
                    size="small"
                    className="formInput passwordConfirm"
                    fullWidth
                    label="パスワード(確認)"
                    variant="outlined"
                    type={values.showPasswordConfirm ? "text" : "password"}
                    value={values.passwordConfirm}
                    onChange={handleChange("passwordConfirm")}
                    error={
                        !validity &&
                        values.passwordConfirm.length !== 0 &&
                        values.password.length !== 0
                    }
                    helperText={
                        !validity &&
                        values.passwordConfirm.length !== 0 &&
                        values.password.length !== 0
                            ? "パスワードが一致していません。"
                            : "\u00a0"
                    }
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
                                    onClick={handleClickShowPasswordConfirm}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPasswordConfirm ? (
                                        <Visibility/>
                                    ) : (
                                        <VisibilityOff/>
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <Button
                    className="signUpButton"
                    fullWidth
                    variant="outlined"
                    color="primary"
                    type="submit"
                    disabled={!validity}
                >
                    サインアップ
                </Button>

                <div className="toSignIn">
                    <ArrowRightIcon className="arrowIcon"/>
                    <span>
            アカウントをお持ちの方は
            <Link to={"/signin"} className="linkStyle">
              こちら
            </Link>
          </span>
                </div>
            </form>
        </div>
    );
};

export default withRouter(SignUp);
