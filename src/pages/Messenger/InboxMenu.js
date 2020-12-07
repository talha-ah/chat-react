import React from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Hidden from "@material-ui/core/Hidden";

import InboxIcon from "@material-ui/icons/Inbox";
import MessageIcon from "@material-ui/icons/Message";

import Row from "../../components/MenuRow";

const useStyles = makeStyles((theme) => ({
  textual: {
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
    placeItems: "center",
    color: theme.palette.common.white,
  },
  // list
  list: {
    paddingTop: 10,
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
  // ====================
  iconic: {
    width: 80,
    height: "100%",
    padding: "25px 16px",
    backgroundColor: theme.palette.custom.primary.dark,
  },
}));

const isSelected = (first, second, style) => {
  return first === second ? style : {};
};

const list = [
  {
    primary: "All Messages",
    secondary: 21,
    icon: <MessageIcon />,
  },
  {
    primary: "Unread",
    secondary: 89,
    icon: <MessageIcon />,
  },
  {
    primary: "Important",
    secondary: 6,
    icon: <MessageIcon />,
  },
  {
    primary: "Drafts",
    secondary: 27,
    icon: <MessageIcon />,
  },
  {
    divider: true,
  },
  {
    primary: "Teams",
    secondary: 4,
    icon: <MessageIcon />,
  },
  {
    primary: "Groups",
    secondary: 3,
    icon: <MessageIcon />,
  },
  {
    primary: "Channels",
    secondary: 18,
    icon: <MessageIcon />,
  },
  {
    primary: "Locations",
    icon: <MessageIcon />,
  },
  {
    primary: "Media",
    secondary: 120,
    icon: <MessageIcon />,
  },
  {
    divider: true,
  },
  {
    primary: "Help",
    icon: <MessageIcon />,
  },
  {
    primary: "Settings",
    icon: <MessageIcon />,
  },
];

const InboxMenu = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <Hidden mdDown>
        <div className={classes.textual}>
          <Row>
            <Typography className={classes.title}>Inbox</Typography>
            <div className={classes.icon}>
              <PersonAddIcon fontSize="inherit" onClick={props.onAdd} />
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
                  onClick={() => props.onChange(item.primary)}
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
      </Hidden>
      <Hidden lgUp smDown={!props.show}>
        <div className={classes.iconic}>
          <Row className={classes.item}>
            <div className={classes.icon}>
              <InboxIcon />
            </div>
          </Row>
          <Row className={classes.item}>
            <Tooltip title="Create Chat" placement="left">
              <div className={classes.icon}>
                <PersonAddIcon />
              </div>
            </Tooltip>
          </Row>
          <div className={classes.list}>
            {list.map((item, index) =>
              item.divider ? (
                <div className={classes.hr} key={index} />
              ) : (
                <Row
                  key={index}
                  className={classes.item}
                  onClick={() => props.onChange(item.primary)}
                  style={isSelected(props.selected, item.primary, {
                    backgroundColor: theme.palette.custom.secondary.light,
                  })}
                >
                  <Tooltip title={item.primary} placement="left">
                    <div className={classes.icon}>{item.icon}</div>
                  </Tooltip>
                </Row>
              ),
            )}
          </div>
        </div>
      </Hidden>
    </>
  );
};

export default InboxMenu;
