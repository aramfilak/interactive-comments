import "./main.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Provider from "./context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);
