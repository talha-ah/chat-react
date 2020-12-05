import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const Row = (props) => {
  const classes = useStyles();
  return (
    <div
      style={props.style}
      onClick={props.onClick}
      className={classes.row + " " + props.className}
    >
      {props.children}
    </div>
  );
};

export default Row;
