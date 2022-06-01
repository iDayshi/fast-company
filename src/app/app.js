import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Users from "./layouts/users";
import NavBar from "./components/ui/navBar";
import "bootstrap/dist/css/bootstrap.css";
import MainPage from "./layouts/main";
import LoginPage from "./layouts/login";
import Edit from "./layouts/edit";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/users/:userId?/edit" component={Edit} />
        <Route path="/users/:userId?" component={Users} />
        <Route path="/users" component={Users} />
        <Route path="/login/:type?" component={LoginPage} />
        <Route path="/" exact component={MainPage} />
        <Redirect to="/users" />
      </Switch>
    </>
  );
}

export default App;
