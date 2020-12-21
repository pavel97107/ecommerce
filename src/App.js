import React from "react";
import { Switch, Route } from "react-router-dom";
import { Login, Register, Home, RegisterComplete } from "./pages";
import { ToastContainer } from "react-toastify";
import { Nav } from "./components";

//styles
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";

const App = () => {
  return (
    <div className="App">
      <Nav />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
      </Switch>
    </div>
  );
};

export default App;
