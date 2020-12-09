import React, {useContext} from "react"
import {withRouter} from "react-router"
import {Link} from "react-router-dom"
import {AuthContext} from "./AuthProvider";
import "firebase/auth"

const SignUp = ({history}:any) => {
    console.log("signup")
    const {signup} = useContext(AuthContext)
    const handleSubmit = (event: any) => {
        event.preventDefault()
        const {email, password} = event.target;
        signup(email.value, password.value, history)
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>E-mail Address</label>
                    <input name={"email"} type={"email"} placeholder={"email@example.com"}/>
                </div>
                <div>
                    <label>Password</label>
                    <input name={"password"} type={"password"} placeholder={"password"}/>
                </div>
                <input type={"submit"} value={"Sign Up"}/>
            </form>
            <Link to={"/signin"}> Sign In</Link>
        </div>
    )
}

export default withRouter(SignUp);