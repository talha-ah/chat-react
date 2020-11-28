import React, { useEffect, useState, useRef } from "react";

import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import SendIcon from "@material-ui/icons/Send";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    transition: "0.3s ease",
  },
  toolbar: {
    backgroundColor: "#F44336",
    borderBottom: "3px solid #ea1c0d",
  },
  title: {
    flexGrow: 1,
    fontWeight: 100,
    marginLeft: theme.spacing(2),
  },
  icon: {
    fontSize: 30,
    color: "#fff",
  },
  messages: {
    padding: 10,
    paddingBottom: 0,
    overflow: "scroll",
    background: "#f2f2f2",
    backgroundColor: "#f2f2f2",
    height: "calc(100% - 64px - 64px)",
    "&::-webkit-scrollbar": {
      width: 0,
    },
  },
  inputContainer: {
    width: "100%",
    height: "64px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: "64px",
    border: "none",
    resize: "none",
    outline: "none",
    padding: "0 3%",
    fontWeight: "300",
    backgroundColor: "#fff",
    width: "calc(100% - 64px)",
  },
  sendButtonContainer: {
    width: "64px",
    height: "100%",
    display: "grid",
    placeItems: "center",
  },
  sendButton: {
    color: "#fff",
    backgroundColor: "#F44336",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#F44336",
    },
  },
  // Receiver
  messageWrapper: {
    width: "100%",
    overflow: "hidden",
    position: "relative",
    padding: "10.6666666667px 0",
    margin: "10.6666666667px 0",
  },
  circleWrapper: {
    fontSize: 20,
    color: "#fff",
    float: "left",
    display: "grid",
    borderRadius: "50%",
    placeItems: "center",
    background: "#F44336",
    width: "42.6666666667px",
    height: "42.6666666667px",
  },
  textWrapper: {
    width: "60%",
    float: "left",
    fontWeight: 300,
    color: "#ffffff",
    borderRadius: "2px",
    position: "relative",
    backgroundColor: "#F44336",
    padding: "10.6666666667px",
    margin: "0 10.6666666667px",
    minHeight: "42.6666666667px",
    animationName: "fadeIn",
    animationFillMode: "both",
    boxShadow: "0px 1px 0px 0px rgba(50, 50, 50, 0.3)",
    "&::before": {
      content: "''",
      width: 0,
      height: 0,
      borderStyle: "solid",
      borderWidth: "0 10px 10px 0",
      borderColor: "transparent #F44336 transparent transparent",
      position: "absolute",
      top: 0,
      left: "-9px",
    },
  },
  // Sender
  messageWrapperMe: {
    width: "100%",
    overflow: "hidden",
    position: "relative",
    padding: "10.6666666667px 0",
    margin: "10.6666666667px 0",
  },
  circleWrapperMe: {
    fontSize: 20,
    color: "#fff",
    float: "right",
    borderRadius: "50%",
    background: "#FF5722",
    width: "42.6666666667px",
    height: "42.6666666667px",
    display: "grid",
    placeItems: "center",
  },
  textWrapperMe: {
    width: "60%",
    float: "right",
    fontWeight: 300,
    color: "#000",
    borderRadius: "2px",
    position: "relative",
    backgroundColor: "#ffffff",
    padding: "10.6666666667px",
    margin: "0 10.6666666667px",
    minHeight: "42.6666666667px",
    animationName: "fadeIn",
    animationFillMode: "both",
    boxShadow: "0px 1px 0px 0px rgba(50, 50, 50, 0.3)",
    "&::before": {
      top: 0,
      width: 0,
      height: 0,
      right: "-9px",
      content: "''",
      position: "absolute",
      borderStyle: "solid",
      borderWidth: "10px 10px 0 0",
      borderColor: "#fff transparent transparent transparent",
    },
  },
}));

const Messenger = () => {
  const classes = useStyles();
  const inputRef = useRef(null);
  const messagesRef = useRef(null);

  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [getUpdate, setUpdated] = useState(false);

  const sendMessage = () => {
    if (text !== "") {
      let messagesArray = messages;
      messagesArray.push({
        id: messagesArray.length + 1,
        user: "Talha",
        text: text,
        time: new Date().getTime(),
      });
      setMessages(messagesArray);
      setText("");
      setUpdated((st) => !st);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const element = messagesRef.current;
      element.scrollTo({
        top: element.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
      inputRef.current.focus();
    }, 200);
  }, [getUpdate]);

  useEffect(() => {
    setMessages([
      {
        id: 1,
        user: "Talha",
        text: "This is a test message",
        time: new Date().getTime(),
      },
      {
        id: 2,
        user: "User",
        text: "This is a test message 2",
        time: new Date().getTime(),
      },
      {
        id: 3,
        user: "Talha",
        text: "This is a test message 2",
        time: new Date().getTime(),
      },
      {
        id: 4,
        user: "User",
        text: "This is a test message 2",
        time: new Date().getTime(),
      },
      {
        id: 5,
        user: "Talha",
        text: "This is a test message 2",
        time: new Date().getTime(),
      },
      {
        id: 6,
        user: "User",
        text: "This is a test message 2",
        time: new Date().getTime(),
      },
      {
        id: 7,
        user: "Talha",
        text: "This is a test message 2",
        time: new Date().getTime(),
      },
      {
        id: 8,
        user: "User",
        text: "This is a test message 2",
        time: new Date().getTime(),
      },
    ]);
    setUpdated((st) => !st);
  }, []);

  return (
    <>
      <Paper className={classes.wrapper}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar} disableGutters>
            <IconButton>
              <ArrowBackIcon className={classes.icon} />
            </IconButton>
            <Typography className={classes.title}>Talha</Typography>
            <IconButton>
              <MoreVertIcon className={classes.icon} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.messages} id="messages" ref={messagesRef}>
          {messages.map((message) =>
            message.user === "Talha" ? (
              <div key={message.id} className={classes.messageWrapperMe}>
                <div className={classes.circleWrapperMe}>
                  {message.user.substring(0, 1)}
                </div>
                <div className={classes.textWrapperMe}>{message.text}</div>
              </div>
            ) : (
              <div key={message.id} className={classes.messageWrapper}>
                <div className={classes.circleWrapper}>
                  {message.user.substring(0, 1)}
                </div>
                <div className={classes.textWrapper}>{message.text}</div>
              </div>
            ),
          )}
        </div>
        <div className={classes.inputContainer}>
          <input
            value={text}
            ref={inputRef}
            className={classes.input}
            onKeyPress={(event) => event.key === "Enter" && sendMessage()}
            onChange={({ target: { name, value } }) => setText(value)}
          />
          <div className={classes.sendButtonContainer}>
            <IconButton onClick={sendMessage} className={classes.sendButton}>
              <SendIcon />
            </IconButton>
          </div>
        </div>
      </Paper>
    </>
  );
};

export default Messenger;
