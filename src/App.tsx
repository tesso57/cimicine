import React from "react";
import "./App.css";
import {AuthProvider} from "./auth/AuthProvider";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import SignIn from "./auth/SignIn";
import PrivateRoute from "./auth/PrivateRoute";
import Home from "./components/Home";
import SignUp from "./auth/SignUp";
import Header from "./components/Header";
import MakeNewLoadMap from "./components/MakeNewLoadMap";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Header/>
                <Switch>
                    <PrivateRoute exact path={"/"} component={Home}/>
                    <Route exact path={"/signin"} component={SignIn}/>
                    <Route exact path={"/signup"} component={SignUp}/>
                    <Route exact path={"/create"} component={MakeNewLoadMap}/>
                </Switch>
            </Router>
        </AuthProvider>
    );
};

export default App;
