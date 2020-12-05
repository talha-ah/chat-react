import React from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Typography from "@material-ui/core/Typography";

import Row from "./MenuRow";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
    height: "100%",
    padding: "25px 16px",
    backgroundColor: theme.palette.custom.primary.dark,
  },
  title: {
    fontSize: "20px",
    fontWeight: 500,
    color: theme.palette.common.white,
  },
  icon: {
    width: 30,
    height: 30,
    display: "grid",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "50%",
    placeItems: "center",
    color: theme.palette.common.white,
    border: `1px solid ${theme.palette.custom.divider.main}`,
  },
  // list
  list: {
    marginTop: 30,
  },
  item: {
    height: 40,
    borderRadius: 4,
    padding: "0 12px",
    margin: "4px 0px",
    cursor: "pointer",
    transition: "all 100ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "&:hover": {
      backgroundColor: theme.palette.custom.secondary.light,
    },
  },
  textPrimary: {
    fontSize: "12px",
    color: theme.palette.custom.primary.contrastText,
  },
  textSecondary: {
    fontSize: "10px",
    fontWeight: "bold",
    color: theme.palette.common.white,
  },
  hr: {
    height: "1px",
    margin: "20px 0px",
    backgroundColor: theme.palette.custom.divider.main,
  },
}));

const isSelected = (first, second, style) => {
  return first === second ? style : {};
};

const list = [
  {
    primary: "All Messages",
    secondary: 21,
  },
  {
    primary: "Unread",
    secondary: 89,
  },
  {
    primary: "Important",
    secondary: 6,
  },
  {
    primary: "Drafts",
    secondary: 27,
  },
  {
    divider: true,
  },
  {
    primary: "Teams",
    secondary: 4,
  },
  {
    primary: "Groups",
    secondary: 3,
  },
  {
    primary: "Channels",
    secondary: 18,
  },
  {
    primary: "Locations",
  },
  {
    primary: "Media",
    secondary: 120,
  },
  {
    divider: true,
  },
  {
    primary: "Help",
  },
  {
    primary: "Settings",
  },
];

const InboxMenu = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <Row>
        <Typography className={classes.title}>Inbox</Typography>
        <div className={classes.icon}>
          <PersonAddIcon fontSize="inherit" />
        </div>
      </Row>
      <div className={classes.list}>
        {list.map((item, index) =>
          item.divider ? (
            <div className={classes.hr} key={index} />
          ) : (
            <Row
              key={index}
              className={classes.item}
              onClick={props.onClick}
              style={isSelected(props.selected, item.primary, {
                backgroundColor: theme.palette.custom.secondary.light,
              })}
            >
              <div
                className={classes.textPrimary}
                style={isSelected(props.selected, item.primary, {
                  color: theme.palette.common.white,
                })}
              >
                {item.primary}
              </div>
              <div className={classes.textSecondary}>{item.secondary}</div>
            </Row>
          ),
        )}
      </div>
    </div>
  );
};

export default InboxMenu;
