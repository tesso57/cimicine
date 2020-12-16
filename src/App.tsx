import React from "react";
import "./App.css";
import { AuthProvider } from "./auth/AuthProvider";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./auth/SignIn";
import PrivateRoute from "./auth/PrivateRoute";
import Home from "./components/Home";
import SignUp from "./auth/SignUp";
import Header from "./components/Header";
import EditRoadmap from "./components/EditRoadmap";
import MakeNewLoadMap from "./components/MakeNewLoadMap";
import Footer from "./components/Footer";
import NotFound from "./auth/404";
import ViewRoadmap from "./components/ViewRoadmap";
import Profile from "./components/Profile";

const App: React.FC = () => {
  return (
    <div className="app">
      <AuthProvider>
        <Router>
          <Header />
          <div className="switch">
            <Switch>
              <Route exact path={"/signin"} component={SignIn} />
              <Route exact path={"/signup"} component={SignUp} />
              <PrivateRoute exact path={"/edit"} component={EditRoadmap} />
              <PrivateRoute exact path={"/create"} component={MakeNewLoadMap} />
              <PrivateRoute exact path={"/view"} component={ViewRoadmap} />
              <PrivateRoute path={"/view/:uid"} component={ViewRoadmap} />
              <PrivateRoute
                path={"/profile/:displayName"}
                component={Profile}
              />
              <PrivateRoute exact path={"/"} component={Home} />
              <Route component={NotFound} />
            </Switch>
            <div className="footer__push"></div>
          </div>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
