import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { ReactComponent as EmptySVG } from "../assets/images/empty.svg";
import { ReactComponent as EmptySVG2 } from "../assets/images/empty2.svg";

const useStyles = makeStyles((theme) => ({
  empty: {
    height: "100%",
    width: "100%",
    display: "grid",
    placeItems: "center",
  },
  center: {
    display: "grid",
    placeItems: "center",
  },
  p: {
    fontSize: 14,
    fontWeight: 500,
    color: theme.palette.custom.icon,
  },
}));

const Empty = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.empty}>
      <div className={classes.center}>
        <EmptySVG color={props.color || "inherit"} />
        <p className={classes.p}>{props.title || "No Data"}</p>
      </div>
    </div>
  );
};
const Empty2 = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.empty}>
      <div className={classes.center}>
        <EmptySVG2 color={props.color || "inherit"} />
        <p className={classes.p}>{props.title || "No Data"}</p>
      </div>
    </div>
  );
};

export default {
  Empty,
  Empty2,
};
