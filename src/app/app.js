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
import AuthProvaider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";

function App() {
  return (
    <>
      <AuthProvaider>
        <NavBar />
        <ProfessionProvider>
          <QualitiesProvider>
            <Switch>
              <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
              <Route path="/logout" component={LogOut} />
              <Route path="/login/:type?" component={LoginPage} />
              <Route path="/" exact component={MainPage} />
              <Redirect to="/users" />
            </Switch>
          </QualitiesProvider>
        </ProfessionProvider>
      </AuthProvaider>
      <ToastContainer />
    </>
  );
}

export default App;
