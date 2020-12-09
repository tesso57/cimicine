import React from "react";
import "./App.css";
import {AuthProvider} from "./auth/AuthProvider";
import { BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Login from "./auth/Login";
import PrivateRoute from "./auth/PrivateRoute";
import Home from "./components/Home";
import SignUp from "./auth/SignUp";

const App: React.FC = () => {
  return (
      <AuthProvider>
          <Router>
              <Switch>
                  <PrivateRoute exact path ={"/"} component={Home}/>
                  <Route exact path={"/login"} component={Login}/>
                  <Route exact path={"/signup"} component={SignUp}/>
              </Switch>
          </Router>
      </AuthProvider>
  );
};

export default App;
