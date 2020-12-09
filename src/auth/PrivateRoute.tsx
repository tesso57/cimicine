import React ,{useContext} from "react"
import {Route} from "react-router-dom";
import {AuthContext} from "./AuthProvider";
import SignIn from "./SignIn";

interface Props {
    component:React.FC
    [x:string]:any
}

const PrivateRoute = ({component,...rest}:Props) => {
    console.log("Hello")
    const {currentUser} = useContext(AuthContext);
    const renderingComponent = currentUser ? component : SignIn;
    return(
        <Route {...rest} component={renderingComponent}/>
    )
}

export default PrivateRoute;