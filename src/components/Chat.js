import React, { useRef, useEffect } from "react";

import StarIcon from "@material-ui/icons/Star";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";

import Row from "./MenuRow";
import Loader from "./Loader";
import Empty from "./Empty";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    height: "100vh",
    backgroundColor: theme.palette.custom.primary.light,
  },
  // input
  topBar: {
    height: "84px",
    paddingLeft: "20px",
    color: theme.palette.custom.primary.contrastText,
    backgroundColor: theme.palette.custom.primary.light,
    borderBottom: `1px solid ${theme.palette.custom.divider.light}`,
  },
  title: {
    fontSize: "14px",
    fontWeight: 700,
    color: theme.palette.custom.icon,
  },
  subTitle: {
    fontSize: "12px",
    color: theme.palette.custom.icon,
  },
  iconWrapper: {
    width: "84px",
    height: "84px",
    display: "grid",
    fontSize: "24px",
    cursor: "pointer",
    placeItems: "center",
    borderLeft: `1px solid ${theme.palette.custom.divider.light}`,
  },
  // list
  list: {
    overflow: "scroll",
    padding: "10px 20px",
    transition: "0.3s ease",
    height: "calc(100vh - 84px - 84px)",
    backgroundColor: theme.palette.custom.primary.light,
    "&::-webkit-scrollbar": {
      width: 1,
      height: 0,
    },
  },
  // Receiver
  messageWrapper: {
    width: "100%",
    overflow: "hidden",
    position: "relative",
    padding: "11px 0",
    margin: "11px 0",
  },
  circleWrapper: {
    fontSize: 20,
    float: "left",
    display: "grid",
    borderRadius: "50%",
    placeItems: "center",
    width: "43px",
    height: "43px",
    color: theme.palette.custom.icon,
    background: theme.palette.common.white,
  },
  textWrapper: {
    width: "60%",
    float: "left",
    fontWeight: 300,
    borderRadius: "4px",
    position: "relative",
    padding: "11px 16px",
    margin: "0 11px",
    minHeight: "43px",
    color: theme.palette.custom.icon,
    background: theme.palette.common.white,
    boxShadow: "0px 1px 0px 0px rgba(50, 50, 50, 0.3)",
    "&::before": {
      content: "''",
      width: 0,
      height: 0,
      top: "16px",
      left: "-6px",
      borderStyle: "solid",
      borderWidth: "6px 6px 6px 0",
      borderColor: `transparent ${theme.palette.common.white} transparent transparent`,
      position: "absolute",
    },
  },
  // Sender
  messageWrapperMe: {
    width: "100%",
    overflow: "hidden",
    position: "relative",
    padding: "11px 0",
    margin: "11px 0",
  },
  circleWrapperMe: {
    fontSize: 20,
    float: "right",
    display: "grid",
    borderRadius: "50%",
    placeItems: "center",
    width: "43px",
    height: "43px",
    color: theme.palette.common.white,
    background: theme.palette.custom.secondary.main,
  },
  textWrapperMe: {
    width: "60%",
    float: "right",
    fontWeight: 300,
    borderRadius: "4px",
    position: "relative",
    padding: "11px",
    margin: "0 11px",
    minHeight: "43px",
    color: theme.palette.common.white,
    background: theme.palette.custom.secondary.main,
    boxShadow: "0px 1px 0px 0px rgba(50, 50, 50, 0.3)",
    "&::before": {
      top: "16px",
      width: 0,
      height: 0,
      right: "-6px",
      content: "''",
      position: "absolute",
      borderStyle: "solid",
      borderWidth: "6px 6px 6px 0",
      borderColor: `${theme.palette.custom.secondary.main} transparent transparent transparent`,
    },
  },
  // Input
  inputContainer: {
    width: "100%",
    height: "84px",
    backgroundColor: theme.palette.common.white,
  },
  attachWrapper: {
    width: "64px",
    height: "100%",
    display: "grid",
    placeItems: "center",
  },
  inputWrapper: {
    width: "calc(100% - 64px - 100px)",
    height: "100%",
  },
  input: {
    width: "100%",
    height: "84px",
    border: "none",
    resize: "none",
    outline: "none",
    padding: "0 1%",
    fontSize: "16px",
    fontWeight: "300",
    backgroundColor: "transparent",
    color: theme.palette.primary.contrastText,
    "&::placeholder": {
      color: theme.palette.primary.contrastText,
    },
  },
  buttonWrapper: {
    width: "100px",
    height: "100%",
  },
}));

const Chat = (props) => {
  const classes = useStyles();
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    props.selectedChat !== "" && setTimeout(scrollToBottom, 200);
  }, [props.list, props.length, props.selectedChat]);
  const scrollToBottom = () => {
    const element = listRef.current;
    element.scrollTo({
      top: element.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
    inputRef.current.focus();
  };

  return (
    <div className={classes.root}>
      {props.selectedChat === "" ? (
        <Empty.Empty />
      ) : (
        <>
          <Row className={classes.topBar}>
            <Row>
              <Typography className={classes.title}>
                {props.selectedChat.user._id === props.user._id
                  ? props.selectedChat.with.firstName +
                    " " +
                    props.selectedChat.with.lastName
                  : props.selectedChat.user.firstName +
                    " " +
                    props.selectedChat.user.lastName}
              </Typography>
              <Typography className={classes.subTitle}>
                &nbsp;&nbsp;is typing...
              </Typography>
            </Row>
            <Row>
              <div className={classes.iconWrapper}>
                <StarIcon className={classes.icon} fontSize="inherit" />
              </div>
            </Row>
          </Row>
          <div className={classes.list} ref={listRef}>
            {props.loading ? (
              <Loader.Progress />
            ) : props.selectedChat === "" ? (
              <Empty.Empty2 />
            ) : props.list.length === 0 ? (
              <Empty.Empty />
            ) : (
              props.list.map((item) =>
                String(item.user) === String(props.user._id) ? (
                  <div key={item._id} className={classes.messageWrapperMe}>
                    <div className={classes.circleWrapperMe}>
                      {item.name.substring(0, 1)}
                    </div>
                    <div className={classes.textWrapperMe}>{item.text}</div>
                  </div>
                ) : (
                  <div key={item._id} className={classes.messageWrapper}>
                    <div className={classes.circleWrapper}>
                      {item.name.substring(0, 1)}
                    </div>
                    <div className={classes.textWrapper}>{item.text}</div>
                  </div>
                ),
              )
            )}
          </div>
          <Row className={classes.inputContainer}>
            <div className={classes.attachWrapper}>
              <IconButton>
                <AttachFileIcon color="inherit" fontSize="inherit" />
              </IconButton>
            </div>
            <div className={classes.inputWrapper}>
              <input
                ref={inputRef}
                value={props.value}
                className={classes.input}
                placeholder="Type your message..."
                onKeyPress={(event) => event.key === "Enter" && props.onClick()}
                onChange={({ target: { name, value } }) =>
                  props.onChange(value)
                }
              />
            </div>
            <Row className={classes.buttonWrapper}>
              <IconButton className={classes.emojiWrapper}>
                <InsertEmoticonIcon color="inherit" fontSize="inherit" />
              </IconButton>
              <IconButton
                onClick={props.onClick}
                disabled={props.messageLoading}
                className={classes.button}
              >
                <SendIcon color="inherit" fontSize="inherit" />
              </IconButton>
            </Row>
          </Row>
        </>
      )}
    </div>
  );
};

export default Chat;
