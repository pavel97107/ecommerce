import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import {
  Login,
  Register,
  Home,
  RegisterComplete,
  ForgotPassword,
} from "./pages";
import { ToastContainer } from "react-toastify";
import { Nav } from "./components";

//styles
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";

//redux fn
import { useDispatch } from "react-redux";
import { auth } from "./firebase";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { token } = await user.getIdTokenResult();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: { email: user.email, token },
        });
      }
    });

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
      </Switch>
    </div>
  );
};

export default App;
