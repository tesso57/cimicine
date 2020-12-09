import React from "react";
import "./App.css";
import {AuthProvider} from "./auth/AuthProvider";
import { BrowserRouter as Router,Route,Switch} from "react-router-dom";
import {SwipeableDrawer} from "@material-ui/core";
import Login from "./auth/Login";

const App: React.FC = () => {
  return (
      <AuthProvider>
          <Router>
              <Switch>
                  <Route component={Login}/>
              </Switch>
          </Router>
      </AuthProvider>
  );
};

export default App;
