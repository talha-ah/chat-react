import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import authReducer from "./store/reducers/auth";
import Main from "./container/Main";

const store = createStore(authReducer);

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 320,
      // sm: 481,
      md: 768,
      lg: 992,
      xl: 1199,
    },
  },
  palette: {
    primary: {
      main: "#f3f6ff",
      contrastText: "#21223a",
    },
    secondary: {
      main: "#4622fe",
      light: "#f2f3f8",
      contrastText: "#aaa9b2",
    },
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
let colors = {
  leftMessengerSelectDarkGrey: "#1e222b",
  MenuMiddle: "#282f37",
  selectedMenuItem: "#353c46",
  chatsListGreyLight: "#282c35",
  chatBubbleBlue: "#0084fe",
  chatBubbleWhite: "#fff",
  chatBackgroundGrey: "#f2f6f9",
  searchBarLightGrey: "#363d45",

  textDimGrey: "#696e74",
  textDimWhite: "#e3e5e7",
  textGrey: "#71777d",
  headerLine: "#30353e",
};

let colors2 = {
  mainBlue: "#4622fe",
  selectedItem: "#f3f6ff",
  input: "#f3f6ff",
  backgroundWhite: "#ffffff",

  textDark: "#21223a",
  textLight: "#f2f3f8",
  textLight2: "#aaa9b2",
};
