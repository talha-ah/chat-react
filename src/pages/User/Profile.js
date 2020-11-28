import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import Messenger from "../Messenger";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundColor: "red",
  },
  content: {
    height: "calc(100vh - 64px - 64px)",
    borderBottom: "5px solid #FF5722",
  },
}));

const Profile = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.content}>
        <Messenger />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
