import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

export default ({ children, ...rest }) => {
  const user = useSelector((state) => state.user);

  return (
    <Route
      {...rest}
      render={() => (user && user.token ? children : <h1>Loading.....</h1>)}
    />
  );
};
