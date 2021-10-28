import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const GuardedRoute = ({ component: Component, ...rest }) => {
  const token = useSelector((state) => state.auth.token);

  return (
    <div>
      <Route
        {...rest}
        render={(props) => (token ? <Component {...props} /> : <Redirect to="/login" />)}
      />
    </div>
  );
};
