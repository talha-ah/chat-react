import React from "react";
import moment from "moment";

import Hidden from "@material-ui/core/Hidden";
import SearchIcon from "@material-ui/icons/Search";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import Row from "../../components/MenuRow";
import Empty from "../../components/Empty";
import Loader from "../../components/Loader";
import Column from "../../components/MenuColumn";

const useStyles = makeStyles((theme) => ({
  textual: {
    width: 320,
    height: "100%",
    backgroundColor: theme.palette.custom.primary.main,
  },
  // input
  topBar: {
    height: "84px",
    padding: "20px",
    color: theme.palette.custom.primary.contrastText,
    borderBottom: `1px solid ${theme.palette.custom.divider.main}`,
  },
  inputWrapper: {
    border: 0,
    width: "100%",
    height: "44px",
    outline: "none",
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
    height: "calc(100% - 84px)",
    paddingTop: 10,
  },
  item: {
    height: 70,
    width: "100%",
    paddingLeft: "18px",
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
    whiteSpace: "nowrap",
    color: theme.palette.custom.primary.contrastText,
  },
  dots: {
    cursor: "pointer",
  },
  // ====================
  iconic: {
    width: 80,
    height: "100%",
    // padding: "25px 16px",
    backgroundColor: theme.palette.custom.primary.main,
  },
  icon: {
    height: 40,
    borderRadius: 4,
    display: "grid",
    fontSize: "16px",
    padding: "0 12px",
    margin: "4px 0px",
    cursor: "pointer",
    placeItems: "center",
    color: theme.palette.common.white,
    transition: "all 100ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "&:hover": {
      backgroundColor: theme.palette.custom.secondary.light,
    },
  },
}));

const isSelected = (first, second, style) => {
  return first === second ? style : {};
};

const FriendsMenu = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (id) => {
    props
      .onDelete(id)
      .then((data) => setAnchorEl(null))
      .catch((err) => setAnchorEl(null));
  };

  return (
    <>
      <Hidden smDown>
        <div className={classes.textual}>
          <Row className={classes.topBar}>
            <Row className={classes.inputWrapper}>
              <SearchIcon className={classes.search} />
              <input
                className={classes.input}
                type="text"
                placeholder="Search"
              />
            </Row>
          </Row>
          <div className={classes.list}>
            {props.list.length === 0 ? (
              <Empty.Empty2 light />
            ) : (
              props.list.map((item) => (
                <Row
                  key={item._id}
                  className={classes.item}
                  style={isSelected(props.selected._id, item._id, {
                    borderColor: theme.palette.custom.secondary.main,
                  })}
                >
                  <div
                    className={classes.avatar}
                    onClick={() => props.onClick(item)}
                  >
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
                    <div
                      className={classes.textPrimary}
                      onClick={() => props.onClick(item)}
                    >
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
                    <MoreHorizIcon
                      color="inherit"
                      className={classes.dots}
                      onClick={handleClick}
                    />
                    <div className={classes.time}>
                      {moment(item.updatedAt).fromNow().split("ago")[0]}
                    </div>
                  </Column>
                  <Menu
                    keepMounted
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => {
                      setAnchorEl(null);
                    }}
                  >
                    {props.loading ? (
                      <MenuItem disabled>
                        <Loader.Progress />
                      </MenuItem>
                    ) : (
                      <MenuItem onClick={() => handleClose(item._id)}>
                        Delete
                      </MenuItem>
                    )}
                  </Menu>
                </Row>
              ))
            )}
          </div>
        </div>
      </Hidden>
      <Hidden mdUp smDown={!props.show}>
        <div className={classes.iconic}>
          <Row className={classes.topBar}>
            <div className={classes.icon}>
              <SearchIcon />
            </div>
          </Row>
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
              </Row>
            ))}
          </div>
        </div>
      </Hidden>
    </>
  );
};

export default FriendsMenu;
