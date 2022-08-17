import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import theme from "./utils/theme";
import { ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material/styles";
import { setUpNotifications } from "reapop";
import { Provider } from "react-redux";
import store from "./state";
import Logo from "src/assets/logos/logo.png";
import { Notification } from "src/components/Notification/Notification";

import { MoralisProvider } from "react-moralis";
import { MORALIS_APP_ID, MORALIS_SERVER_URL } from "./config/config";

// run this function when your application starts before creating any notifications
setUpNotifications({
  defaultProps: {
    position: "top-right",
    dismissible: true,
    showDismissButton: true,
    dismissAfter: 5000,
    image: Logo,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider serverUrl={MORALIS_SERVER_URL!} appId={MORALIS_APP_ID!}>
      <Provider store={store}>
        <Notification />
        <BrowserRouter>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </StyledEngineProvider>
        </BrowserRouter>
      </Provider>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
