import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import socketIOClient from "socket.io-client";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SendIcon from "@material-ui/icons/Send";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import API from "../../globals/API";
import Constants from "../../globals/Constants";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  content: {
    height: "calc(100vh - 64px - 64px)",
  },
  wrapper: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    transition: "0.3s ease",
  },
  toolbar: {
    backgroundColor: theme.palette.secondary.light,
  },
  title: {
    flexGrow: 1,
    fontWeight: "bold",
    marginLeft: theme.spacing(2),
    color: theme.palette.primary.contrastText,
  },
  icon: {
    fontSize: 30,
    color: theme.palette.primary.contrastText,
  },
  messages: {
    padding: "10px",
    overflow: "scroll",
    backgroundColor: "#fff",
    height: "calc(100% - 64px - 64px)",
    "&::-webkit-scrollbar": {
      width: 0,
    },
  },
  inputContainer: {
    width: "100%",
    height: "64px",
    display: "flex",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.palette.secondary.light,
  },
  input: {
    height: "64px",
    border: "none",
    resize: "none",
    outline: "none",
    padding: "0 3%",
    fontWeight: "300",
    width: "calc(100% - 64px)",
    backgroundColor: "transparent",
    color: theme.palette.primary.contrastText,
  },
  sendButtonContainer: {
    width: "64px",
    height: "100%",
    display: "grid",
    placeItems: "center",
  },
  sendButton: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.secondary.main,
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
    float: "left",
    display: "grid",
    borderRadius: "50%",
    placeItems: "center",
    width: "42.6666666667px",
    height: "42.6666666667px",
    color: theme.palette.primary.contrastText,
    background: theme.palette.secondary.light,
  },
  textWrapper: {
    width: "60%",
    float: "left",
    fontWeight: 300,
    borderRadius: "2px",
    position: "relative",
    padding: "10.6666666667px",
    margin: "0 10.6666666667px",
    minHeight: "42.6666666667px",
    color: theme.palette.primary.contrastText,
    background: theme.palette.secondary.light,
    boxShadow: "0px 1px 0px 0px rgba(50, 50, 50, 0.3)",
    "&::before": {
      content: "''",
      width: 0,
      height: 0,
      borderStyle: "solid",
      borderWidth: "0 10px 10px 0",
      borderColor: `transparent ${theme.palette.secondary.light} transparent transparent`,
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
    float: "right",
    display: "grid",
    borderRadius: "50%",
    placeItems: "center",
    width: "42.6666666667px",
    height: "42.6666666667px",
    color: theme.palette.common.white,
    background: theme.palette.secondary.main,
  },
  textWrapperMe: {
    width: "60%",
    float: "right",
    fontWeight: 300,
    borderRadius: "2px",
    position: "relative",
    padding: "10.6666666667px",
    margin: "0 10.6666666667px",
    minHeight: "42.6666666667px",
    color: theme.palette.common.white,
    background: theme.palette.secondary.main,
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
      borderColor: `${theme.palette.secondary.main} transparent transparent transparent`,
    },
  },
}));

let socket;

const Chat = (props) => {
  const classes = useStyles();
  const inputRef = useRef(null);
  const messagesRef = useRef(null);
  const store = useSelector((state) => state);

  const [text, setText] = useState("");
  const [userTo, setUserTo] = useState("");
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [getUpdate, setUpdated] = useState(false);
  const [messageLoading, setMessageLoading] = useState(false);

  useEffect(() => {
    socket = socketIOClient(Constants.BASE_URL, {
      query: `userId=${store.user._id}`,
    });

    socket.on("message", (data) => {
      if (data.action === "create") {
        setMessages((arr) => {
          arr = [...arr, data.message];
          return arr;
        });
        setUpdated((st) => !st);
      } else if (data.action === "delete") {
        console.log("delete message", { data });
      }
    });
    getChat();
    return () => {
      socket.disconnect("true");
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [getUpdate]);

  const scrollToBottom = () => {
    const element = messagesRef.current;
    element.scrollTo({
      top: element.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
    inputRef.current.focus();
  };
  const getChat = async () => {
    try {
      const data = await API({
        uri: Constants.GET_CHAT + "/" + props.match.params.chatId,
        token: store.token,
      });
      setUserTo(
        String(data.chat.user._id) === String(store.user._id)
          ? data.chat.with
          : data.chat.user,
      );
      setMessages(data.chat.messages);
      setLoading(false);
      setUpdated((st) => !st);
    } catch (err) {
      alert("There was an error");
    }
  };
  const sendMessage = async () => {
    try {
      if (text !== "") {
        setMessageLoading(true);
        const data = await API({
          method: "POST",
          uri: Constants.CREATE_MESSAGE + "/" + props.match.params.chatId,
          token: store.token,
          body: JSON.stringify({
            text: text,
            receiverId: userTo._id,
          }),
        });
        setMessages((arr) => {
          arr = [...arr, data.message];
          return arr;
        });
        // setMessages([...messages, data.message]);
        setText("");
        setUpdated((st) => !st);
        setMessageLoading(false);
      }
    } catch (err) {
      setMessageLoading(false);
      alert("There was an error");
    }
  };

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.content}>
        <div className={classes.wrapper}>
          <AppBar position="static">
            <Toolbar className={classes.toolbar} disableGutters>
              <IconButton onClick={() => props.history.goBack()}>
                <ArrowBackIcon className={classes.icon} />
              </IconButton>
              <Typography className={classes.title}>
                {userTo !== "" && userTo.firstName + " " + userTo.lastName}
              </Typography>
              <IconButton>
                <MoreVertIcon className={classes.icon} />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div className={classes.messages} id="messages" ref={messagesRef}>
            {loading ? (
              <Loader.Progress />
            ) : (
              messages.map((message) =>
                String(message.user) === String(store.user._id) ? (
                  <div key={message._id} className={classes.messageWrapperMe}>
                    <div className={classes.circleWrapperMe}>
                      {message.name.substring(0, 1)}
                    </div>
                    <div className={classes.textWrapperMe}>{message.text}</div>
                  </div>
                ) : (
                  <div key={message._id} className={classes.messageWrapper}>
                    <div className={classes.circleWrapper}>
                      {message.name.substring(0, 1)}
                    </div>
                    <div className={classes.textWrapper}>{message.text}</div>
                  </div>
                ),
              )
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
              <IconButton
                onClick={sendMessage}
                className={classes.sendButton}
                disabled={messageLoading}
              >
                <SendIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Chat;
