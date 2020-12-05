import React from "react";
import moment from "moment";

import SearchIcon from "@material-ui/icons/Search";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Row from "./MenuRow";
import Column from "./MenuColumn";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 320,
    height: "100%",
    backgroundColor: theme.palette.custom.primary.main,
  },
  // input
  inputWrapper: {
    border: 0,
    width: "87.5%",
    height: "44px",
    outline: "none",
    margin: "20px 20px",
    fontSize: "12px",
    borderRadius: 50,
    padding: "0 20px",
    color: theme.palette.custom.primary.contrastText,
    backgroundColor: theme.palette.custom.secondary.light,
  },
  search: {
    width: "10%",
  },
  input: {
    border: 0,
    width: "90%",
    height: "100%",
    outline: "none",
    fontSize: "12px",
    padding: "0 10px",
    backgroundColor: "transparent",
    color: theme.palette.custom.primary.contrastText,
    "&::placeholder": {
      color: theme.palette.custom.primary.contrastText,
    },
  },
  // list
  list: {
    marginTop: 10,
  },
  item: {
    height: 70,
    width: "100%",
    paddingLeft: "20px",
    marginBottom: "2px",
    transition: "all  100ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    borderLeft: "3px solid transparent",
    "&:hover": {
      borderColor: theme.palette.custom.secondary.main,
    },
  },
  avatar: {
    width: "14%",
    cursor: "pointer",
  },
  textPrimary: {
    fontSize: "13px",
    fontWeight: 400,
    cursor: "pointer",
    color: theme.palette.common.white,
  },
  textSecondary: {
    fontSize: "11px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    color: theme.palette.custom.primary.contrastText,
  },
  time: {
    fontSize: "10px",
    color: theme.palette.custom.primary.contrastText,
  },
  dots: {
    cursor: "pointer",
  },
  hr: {
    width: "100%",
    height: "1px",
    backgroundColor: theme.palette.custom.divider.main,
  },
}));

const isSelected = (first, second, style) => {
  return first === second ? style : {};
};

const FriendsMenu = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <Row className={classes.inputWrapper}>
        <SearchIcon className={classes.search} />
        <input className={classes.input} type="text" placeholder="Search" />
      </Row>
      <div className={classes.hr} />
      <div className={classes.list}>
        {props.list.map((item) => (
          <Row
            key={item._id}
            className={classes.item}
            onClick={() => props.onClick(item)}
            style={isSelected(props.selected._id, item._id, {
              borderColor: theme.palette.custom.secondary.main,
            })}
          >
            <div className={classes.avatar}>
              <img
                src={
                  "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
                }
                alt="avatar_chat"
                width="40"
                height="40"
              />
            </div>
            <Column
              style={{
                width: "64%",
              }}
            >
              <div className={classes.textPrimary}>
                {item.user._id === props.user._id
                  ? item.with.firstName + " " + item.with.lastName
                  : item.user.firstName + " " + item.user.lastName}
              </div>
              <div className={classes.textSecondary}>
                {item.user._id === props.user._id
                  ? item.with.email
                  : item.user.email}
              </div>
            </Column>
            <Column
              style={{
                width: "14%",
                paddingRight: "10px",
                alignItems: "flex-end",
                color: theme.palette.common.white,
              }}
            >
              <MoreHorizIcon color="inherit" className={classes.dots} />
              <div className={classes.time}>
                {moment(item.updatedAt).fromNow()}
              </div>
            </Column>
          </Row>
        ))}
      </div>
    </div>
  );
};

export default FriendsMenu;
