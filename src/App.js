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
    custom: {
      primary: {
        light: "#eef0f3",
        main: "#242a31",
        dark: "#1d232a",
        contrastText: "#a0a4a7",
      },
      secondary: {
        light: "#363d45",
        main: "#0084ff",
        dark: "#3c4249",
        contrastText: "#fff",
      },
      divider: {
        light: "#cfd2d7",
        main: "#363d44",
      },
      text: {
        main: "#a0a4a7",
        icon: "#81868c",
      },
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

// primary: {
//   main: "#f3f6ff",
//   contrastText: "#21223a",
// },
// secondary: {
//   main: "#4622fe",
//   light: "#f2f3f8",
//   contrastText: "#aaa9b2",
// },
