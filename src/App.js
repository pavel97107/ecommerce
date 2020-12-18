import React from "react";
import { Switch, Route } from "react-router-dom";
import { Login, Register, Home } from "./pages";
import {Nav} from './components'

//styles
import 'antd/dist/antd.css'


const App = () => {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  );
};

export default App;
