import React from "react";
import "normalize.css";
import { ExtensionProvider } from "@looker/extension-sdk-react";
import { hot } from "react-hot-loader/root";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import { Home } from "./components/Home";
import { ErrorBoundary } from "./components/_lowLevel/ErrorBoundary";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./style.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00559b",
      contrastText: "#ffffff",
      light: "#f5fcfc",
      dark: "#00559b",

    },
    secondary: {
      main: "#00559b",
      contrastText: "#ffffff",
      light: "#f5fcfc",
      dark: "#00559b",
    },
    error: {
      main: "#D13630",
    },
  },
});

export const App = hot(() => {
  return (
    <ExtensionProvider>
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/:dashboardId">
              <Home />
            </Route>
          </Switch>
        </ErrorBoundary>
      </ThemeProvider>
    </ExtensionProvider>
  );
});
