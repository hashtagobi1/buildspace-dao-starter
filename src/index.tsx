import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";

// Chain Id's here: https://besu.hyperledger.org/en/stable/Concepts/NetworkID-And-ChainID/
const supportedChainIds = [4];

// include type of wallet... injected , ETH object injected into window
// hardware wallet, mobile, injected
const connectors = {
  injected: {},
};

// wrap app with provider

// Render the App component to the DOM
ReactDOM.render(
  <React.StrictMode>
    <ThirdwebWeb3Provider
    connectors={connectors}
    supportedChainIds={supportedChainIds}
    >
      <App />
    </ThirdwebWeb3Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
