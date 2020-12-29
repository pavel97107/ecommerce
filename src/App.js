import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import {
  Login,
  Register,
  Home,
  RegisterComplete,
  ForgotPassword,
  History,
  Wishlist,
  Password,
  AdminDashboard,
  CreateCategory,
  UpdateCategory
} from "./pages";
import { ToastContainer } from "react-toastify";
import { UserRoute, AdminRoute } from "./helpers";
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
    let fn;
    api.auth.unsubscribe(dispatch).then((res) => (fn = res));
    return () => fn();
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
        <UserRoute exact path="/user/history" component={<History />} />
        <UserRoute exact path="/user/password" component={<Password />} />
        <UserRoute exact path="/user/wishlist" component={<Wishlist />} />
        <AdminRoute
          exact
          path="/admin/dashboard"
          component={<AdminDashboard />}
        />
        <AdminRoute
          exact
          path="/admin/category"
          component={<CreateCategory />}
        />
        <AdminRoute
          exact
          path="/admin/category/:slug"
          component={<UpdateCategory />}
        />
      </Switch>
    </div>
  );
};

export default App;
