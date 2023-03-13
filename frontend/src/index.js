require('file-loader?name=[name].[ext]!../public/index.html');


import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";



const activeChain = "ethereum";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={activeChain}>
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);

