import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

const Column = (props) => {
  const classes = useStyles();
  return (
    <div
      style={props.style}
      onClick={props.onClick}
      className={classes.column + " " + props.className}
    >
      {props.children}
    </div>
  );
};

export default Column;
