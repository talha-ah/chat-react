import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import socketIOClient from "socket.io-client";

import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import PersonIcon from "@material-ui/icons/Person";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import API from "../../globals/API";
import Constants from "../../globals/Constants";

import Loader from "../../components/Loader";
import InboxMenu from "../../components/InboxMenu";
import FriendsMenu from "../../components/FriendsMenu";
import Chat from "../../components/Chat";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  drawer: {
    // width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
  },
}));

let socket;

const Messenger = (props) => {
  const classes = useStyles();
  const store = useSelector((state) => state);

  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [messageLoading, setMessageLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  // Socket
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
        // setUpdated((st) => !st);
      } else if (data.action === "delete") {
        console.log("delete message", { data });
      }
    });
    // getChat();
    return () => {
      socket.disconnect("true");
    };
    // eslint-disable-next-line
  }, []);

  // Use Effects
  useEffect(() => {
    getChats();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    selectedChat !== "" && getChat();
    // eslint-disable-next-line
  }, [selectedChat]);

  // Chats
  const getChats = async () => {
    try {
      const data = await API({
        uri: Constants.GET_CHATS,
        token: store.token,
      });
      setChats(data.chats);
      setLoading(false);
    } catch (err) {
      alert("Whoops, there was an error!");
    }
  };
  const getChat = async () => {
    try {
      setChatLoading(true);
      const data = await API({
        uri: Constants.GET_CHAT + "/" + selectedChat._id,
        token: store.token,
      });
      setMessages(data.chat.messages);
      setChatLoading(false);
    } catch (err) {
      setChatLoading(false);
    }
  };
  const onDelete = async (chatId) => {
    try {
      setDeleteLoading(true);
      const data = await API({
        method: "DELETE",
        uri: Constants.DELETE_CHAT + "/" + chatId,
        token: store.token,
      });
      setChats((chatsArray) => {
        chatsArray = chatsArray.filter(
          (chat) => String(chat._id) !== String(data.chat._id),
        );
        return chatsArray;
      });
      setDeleteLoading(false);
    } catch (err) {
      setDeleteLoading(false);
    }
  };
  // Messages
  const sendMessage = async () => {
    try {
      if (text !== "") {
        setMessageLoading(true);
        let receiverId =
          selectedChat.user._id === store.user._id
            ? selectedChat.with._id
            : selectedChat.user._id;
        const data = await API({
          method: "POST",
          uri: Constants.CREATE_MESSAGE + "/" + selectedChat._id,
          token: store.token,
          body: JSON.stringify({
            text: text,
            receiverId: receiverId,
          }),
        });
        setMessages((arr) => {
          arr = [...arr, data.message];
          return arr;
        });
        setText("");
        setMessageLoading(false);
      }
    } catch (err) {
      setMessageLoading(false);
    }
  };

  const onClose = async ({ id }) => {
    try {
      if (id) {
        setChatLoading(true);
        const data = await API({
          method: "POST",
          uri: Constants.CREATE_CHAT,
          token: store.token,
          body: JSON.stringify({
            withId: id,
          }),
        });
        setChatLoading(false);
        setOpen(false);
        props.history.push("/messenger/" + data.chat._id);
      } else {
        setOpen(false);
      }
    } catch (err) {
      alert("Whoops, there was an error!");
    }
  };

  return loading ? (
    <Loader.CenterProgress />
  ) : (
    <div className={classes.root}>
      <InboxMenu selected="All Messages" />
      <FriendsMenu
        list={chats}
        user={store.user}
        selected={selectedChat}
        onClick={(chat) => {
          setSelectedChat(chat);
        }}
      />
      <Chat
        list={messages}
        length={messages.length}
        selected={3}
        user={store.user}
        loading={chatLoading}
        selectedChat={selectedChat}
        value={text}
        onChange={(value) => setText(value)}
        messageLoading={messageLoading}
        onClick={sendMessage}
        onOpenDrawer={() => setDrawerOpen(true)}
      />
      <SimpleDialog open={open} onClose={onClose} loading={chatLoading} />
      <Drawer
        anchor={"left"}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <div className={classes.drawer}>
          <InboxMenu selected="All Messages" show={true} />
          <FriendsMenu
            list={chats}
            user={store.user}
            selected={selectedChat}
            onClick={(chat) => {
              setSelectedChat(chat);
            }}
            show={true}
          />
        </div>
      </Drawer>
    </div>
  );
};

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, open } = props;
  const store = useSelector((state) => state);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  const getUsers = async () => {
    try {
      const data = await API({
        uri: Constants.GET_ALL,
        token: store.token,
      });
      setUsers(
        data.users.filter(
          (user) => String(user._id) !== String(store.user._id),
        ),
      );
      setLoading(false);
    } catch (err) {
      alert("Whoops, there was an error!");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="md">
      <DialogTitle>
        {users.length === 0 ? "No Users Found!" : "Start new chat"}
      </DialogTitle>
      <List>
        {loading || props.loading ? (
          <Loader.Progress />
        ) : (
          users.map((user) => (
            <ListItem
              button
              onClick={() => onClose({ id: user._id })}
              key={user._id}
            >
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.firstName + " " + user.lastName} />
            </ListItem>
          ))
        )}
      </List>
    </Dialog>
  );
}

export default Messenger;
