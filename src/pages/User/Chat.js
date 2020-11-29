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
    borderBottom: "5px solid #FF5722",
    height: "calc(100vh - 64px - 64px)",
  },
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

let socket;

const Chat = (props) => {
  const classes = useStyles();
  const inputRef = useRef(null);
  const messagesRef = useRef(null);
  const store = useSelector((state) => state);

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [getUpdate, setUpdated] = useState(false);
  const [userTo, setUserTo] = useState("");
  const [messageLoading, setMessageLoading] = useState(false);

  useEffect(() => {
    // socket = socketIOClient(Constants.BASE_URL);
    // socket.on("toClient", (data) => {
    //   console.log("toClient", { data });
    // });
    getChat();
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
      setUserTo(data.chat.with);
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
          }),
        });
        let messagesArray = messages;
        messagesArray.push(data.message);
        setMessages(messagesArray);
        setText("");
        setUpdated((st) => !st);
        setMessageLoading(false);
        // socket.emit("toServer", message);
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
