import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import API from "../globals/API";
import Constants from "../globals/Constants";
import * as actionTypes from "../store/actions/actionTypes";

import Login from "../pages/Login";
import Register from "../pages/Register";
import PasswordForgot from "../pages/PasswordForgot";

// User
import Profile from "../pages/User/Profile";
import Messenger from "../pages/Messenger/Messenger";

import Loader from "../components/Loader";

const MAIN = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    checkLogin();
    // eslint-disable-next-line
  }, []);

  const checkLogin = async () => {
    try {
      const token = localStorage.getItem("test");
      if (!token) {
        setLoading(false);
        return;
      }
      const data = await API({
        uri: Constants.GET_PROFILE,
        token: token,
      });
      dispatch({
        type: actionTypes.LOGIN,
        user: data.user,
        token: token,
      });
      setLoading(false);
    } catch (err) {
      localStorage.removeItem("test");
      console.log(err);
    }
  };

  return loading ? (
    <Loader.CenterProgress />
  ) : store.auth ? (
    <Switch>
      <Route exact path="/" component={Profile} />
      <Route exact path="/messenger" component={Messenger} />
      <Redirect from="*" to="/" />
    </Switch>
  ) : (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/password-forgot" component={PasswordForgot} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default MAIN;
