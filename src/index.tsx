import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRouter from "./AppRouter";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MoralisProvider initializeOnMount={false}>
      <BrowserRouter>
        <NotificationProvider>
          <AppRouter />
        </NotificationProvider>
      </BrowserRouter>
    </MoralisProvider>
  </React.StrictMode>
);
