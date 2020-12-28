import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginToRedirect from "./LoginToRedirect";

export default ({ component, ...rest }) => {
  const user = useSelector((state) => state.user);

  return (
    <Route
      {...rest}
      render={() => (user && user.token ? component : <LoginToRedirect />)}
    />
  );
};
