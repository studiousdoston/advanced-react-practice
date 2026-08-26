import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { deposit } from "./features/accounts/accountSlice";
import store from "./store";

store.dispatch(deposit(500));
console.log(store.getState());

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
