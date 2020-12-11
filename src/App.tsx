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

const App: React.FC = () => {
  return (
    <div className="app">
      <AuthProvider>
        <Router>
          <Header />
          <Switch>
            <PrivateRoute exact path={"/"} component={Home} />
            <Route exact path={"/signin"} component={SignIn} />
            <Route exact path={"/signup"} component={SignUp} />
            <Route exact path={"/edit"} component={EditRoadmap} />
            <Route exact path={"/create"} component={MakeNewLoadMap} />
          </Switch>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
