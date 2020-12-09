import React from "react";
import "./App.css";
import {AuthProvider} from "./auth/AuthProvider";
import { BrowserRouter as Router,Route,Switch} from "react-router-dom";
import {SwipeableDrawer} from "@material-ui/core";
import Login from "./auth/Login";
import PrivateRoute from "./auth/PrivateRoute";
import Home from "./components/Home";

const App: React.FC = () => {
  return (
      <AuthProvider>
          <Router>
              <Switch>
                  <PrivateRoute exact path ={"/"} component={Home}/>
                  <Route exact path={"/login"} component={Login}/>
              </Switch>
          </Router>
      </AuthProvider>
  );
};

export default App;
