import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Fab from "@material-ui/core/Fab";
import List from "@material-ui/core/List";
import Badge from "@material-ui/core/Badge";
import AddIcon from "@material-ui/icons/Add";
import Hidden from "@material-ui/core/Hidden";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import ListItem from "@material-ui/core/ListItem";
import PersonIcon from "@material-ui/icons/Person";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
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
    height: "calc(100vh - 64px - 64px)",
  },
  wrapper: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    transition: "0.3s ease",
  },
  icon: {
    fontSize: 30,
    color: theme.palette.common.white,
  },
  messenger: {
    padding: 10,
    display: "flex",
    paddingBottom: 0,
    overflow: "scroll",
    position: "relative",
    flexDirection: "column",
    height: "calc(100%)",
    justifyContent: "space-between",
    backgroundColor: theme.palette.common.white,
    "&::-webkit-scrollbar": {
      width: 0,
    },
  },
  fab: {
    bottom: 0,
    right: 10,
    boxShadow: "none",
    position: "absolute",
    color: theme.palette.secondary.light,
    backgroundColor: theme.palette.secondary.main,
  },
  drawerPaper: {
    width: 350,
  },
  listItem: {
    borderRadius: 10,
    "&.Mui-selected, &:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  listItemTextPrimary: {
    fontWeight: "bold",
    color: theme.palette.primary.contrastText,
  },
  listItemTextSecondary: {
    color: theme.palette.secondary.contrastText,
  },
}));

const Messenger = (props) => {
  const classes = useStyles();
  const store = useSelector((state) => state);

  const [chats, setChats] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState("");

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
      alert("Whoops, there was an error!");
      setDeleteLoading(false);
    }
  };

  const ListRender = () => (
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
            classes={{
              root: classes.listItem,
            }}
          >
            <ListItemAvatar>
              <Badge
                badgeContent={chat.messages.length}
                color="secondary"
                showZero={true}
              >
                <Avatar>
                  <img
                    src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
                    alt="avatar_chat"
                    width="40"
                    height="40"
                  />
                </Avatar>
              </Badge>
            </ListItemAvatar>
            <ListItemText
              primary={
                chat.user._id === store.user._id
                  ? chat.with.firstName + " " + chat.with.lastName
                  : chat.user.firstName + " " + chat.user.lastName
              }
              secondary={
                chat.user._id === store.user._id
                  ? chat.with.email
                  : chat.user.email
              }
              primaryTypographyProps={{
                classes: { root: classes.listItemTextPrimary },
              }}
              secondaryTypographyProps={{
                classes: { root: classes.listItemTextSecondary },
              }}
            />
            <ListItemSecondaryAction>
              <IconButton
                onClick={() => {
                  setSelectedChatId(chat._id);
                  onDelete(chat._id);
                }}
                disabled={
                  deleteLoading && String(chat._id) === String(selectedChatId)
                }
              >
                <DeleteIcon
                  color={
                    deleteLoading && String(chat._id) === String(selectedChatId)
                      ? "disabled"
                      : "error"
                  }
                />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))
      )}
      {!loading && chats.length === 0 && (
        <ListItem>
          <ListItemText
            primary={"We come up empty"}
            secondary={"Click + button to start a new chat"}
            primaryTypographyProps={{
              classes: { root: classes.listItemTextPrimary },
            }}
            secondaryTypographyProps={{
              classes: { root: classes.listItemTextSecondary },
            }}
          />
        </ListItem>
      )}
    </List>
  );

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.content}>
        <Hidden smUp implementation="css">
          <SwipeableDrawer
            anchor={"left"}
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            onOpen={() => setDrawerOpen(true)}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            container={
              window !== undefined ? () => window.document.body : undefined
            }
          >
            <ListRender />
          </SwipeableDrawer>
        </Hidden>
        <div className={classes.wrapper}>
          <div className={classes.messenger}>
            <ListRender />
            <Fab
              // color="secondary"
              className={classes.fab}
              onClick={() => setOpen(true)}
            >
              <AddIcon />
            </Fab>
          </div>
        </div>
      </div>
      <Footer />
      <SimpleDialog open={open} onClose={onClose} loading={chatLoading} />
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
