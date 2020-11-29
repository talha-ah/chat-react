import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import Button from "../../components/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  content: {
    display: "flex",
    padding: "20px 10px",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    borderBottom: "5px solid #FF5722",
    height: "calc(100vh - 64px - 64px)",
    backgroundColor: theme.palette.grey[400],
  },
}));

const Profile = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.content}>
        <p>Main Page</p>
        <Button
          text="Go to Messenger"
          onClick={() => {
            props.history.push("/messenger");
          }}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
