import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Users from "./layouts/users";
import NavBar from "./components/ui/navBar";
import "bootstrap/dist/css/bootstrap.css";
import MainPage from "./layouts/main";
import LoginPage from "./layouts/login";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQualities";

function App() {
  return (
    <>
      <NavBar />
      <ProfessionProvider>
        <QualitiesProvider>
          <Switch>
            <Route path="/users/:userId?/:edit?" component={Users} />
            <Route path="/users" component={Users} />
            <Route path="/login/:type?" component={LoginPage} />
            <Route path="/" exact component={MainPage} />
            <Redirect to="/users" />
          </Switch>
        </QualitiesProvider>
      </ProfessionProvider>

      <ToastContainer />
    </>
  );
}

export default App;
