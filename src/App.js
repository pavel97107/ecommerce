import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import {
  Login,
  Register,
  Home,
  RegisterComplete,
  ForgotPassword,
  History,
} from "./pages";
import { ToastContainer } from "react-toastify";
import { UserRoute } from "./helpers";
import { Nav } from "./components";
import api from "./api";
//styles
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";

//redux fn
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = api.auth.unsubscribe(dispatch);
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <Nav />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoute exact path="/user/history">
          <History />
        </UserRoute>
      </Switch>
    </div>
  );
};

export default App;
