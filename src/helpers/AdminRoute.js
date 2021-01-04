import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginToRedirect from "./LoginToRedirect";
import api from "../api";

export default ({ component, ...rest }) => {
  const user = useSelector((state) => state.user);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      api.admin
        .currentAdmin(user.token)
        .then((res) => {
          setOk(true);
        })
        .catch((err) => console.error(err.message));
    }
  }, [user]);

  return (
    <Route {...rest} render={() => (ok ? component : <LoginToRedirect />)} />
  );
};
