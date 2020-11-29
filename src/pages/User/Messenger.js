import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Fab from "@material-ui/core/Fab";
import List from "@material-ui/core/List";
import Badge from "@material-ui/core/Badge";
import AddIcon from "@material-ui/icons/Add";
import Avatar from "@material-ui/core/Avatar";
import AppBar from "@material-ui/core/AppBar";
import Dialog from "@material-ui/core/Dialog";
import ChatIcon from "@material-ui/icons/Chat";
import Toolbar from "@material-ui/core/Toolbar";
import ListItem from "@material-ui/core/ListItem";
import PersonIcon from "@material-ui/icons/Person";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

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
  messenger: {
    padding: 10,
    paddingBottom: 0,
    overflow: "scroll",
    background: "#f2f2f2",
    backgroundColor: "#f2f2f2",
    height: "calc(100% - 64px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "&::-webkit-scrollbar": {
      width: 0,
    },
  },
  fab: {
    alignSelf: "flex-end",
  },
}));

const Messenger = (props) => {
  const classes = useStyles();
  const store = useSelector((state) => state);

  const [chats, setChats] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => {
    getChats();
    // eslint-disable-next-line
  }, []);

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

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.content}>
        <div className={classes.wrapper}>
          <AppBar position="static">
            <Toolbar className={classes.toolbar} disableGutters>
              <Typography className={classes.title}>Messenger</Typography>
              <IconButton>
                <MoreVertIcon className={classes.icon} />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div className={classes.messenger}>
            <List style={{ height: "100%" }}>
              {loading ? (
                <Loader.Progress />
              ) : (
                chats.map((chat) => (
                  <ListItem
                    button
                    key={chat._id}
                    onClick={() => {
                      setTimeout(
                        () => props.history.push("/messenger/" + chat._id),
                        250,
                      );
                    }}
                  >
                    <ListItemAvatar>
                      <Badge
                        badgeContent={chat.messages.length}
                        color="primary"
                        showZero={true}
                      >
                        <Avatar>
                          <ChatIcon />
                        </Avatar>
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={chat.with.firstName + " " + chat.with.lastName}
                      secondary={chat.with.email}
                    />
                    <ListItemSecondaryAction>
                      {chat.messages.length}
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              )}
              {!loading && chats.length === 0 && (
                <ListItem>
                  <ListItemText
                    primary={"We come up empty"}
                    secondary={"Click + button to start a new chat"}
                  />
                </ListItem>
              )}
            </List>
            <Fab
              color="primary"
              className={classes.fab}
              onClick={() => setOpen(true)}
            >
              <AddIcon />
            </Fab>
          </div>
        </div>
      </div>
      <SimpleDialog open={open} onClose={onClose} loading={chatLoading} />
      <Footer />
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
