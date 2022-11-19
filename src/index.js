import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { MoralisProvider } from "react-moralis";


function getLibrary(provider) {
  return new Web3Provider(provider);
}

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <MoralisProvider appId="vVl0cMrIKBuS86sts3JjWUpRXRO2DFMGk3C5M8FB" 
    serverUrl="https://eomdvowfo87k.grandmoralis.com:2053/server">
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </MoralisProvider>
  </Web3ReactProvider>,
  document.getElementById("root")
);

reportWebVitals();
