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
import { WalletProvider, CHAIN_ID } from "@react-dapp/wallet";
import Logo from "src/assets/logos/logo.png";
import { Notification } from "src/components/Notification/Notification";
import { isProduction } from "./config/config";

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
    <WalletProvider
      config={{
        chainId: isProduction ? CHAIN_ID.ETH : CHAIN_ID.GOERLI,
        supportedChainIds: [{ id: isProduction ? CHAIN_ID.ETH : CHAIN_ID.GOERLI }],
      }}
    >
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
    </WalletProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
