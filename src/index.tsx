import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRouter from "./AppRouter";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import { BrowserRouter } from "react-router-dom";
import AuctionProvider from "./context/AuctionContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MoralisProvider initializeOnMount={false}>
      <AuctionProvider>
        <BrowserRouter>
          <NotificationProvider>
            <AppRouter />
          </NotificationProvider>
        </BrowserRouter>
      </AuctionProvider>
    </MoralisProvider>
  </React.StrictMode>
);
