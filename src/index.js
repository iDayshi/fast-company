import React from "react";
import { Router } from "react-router-dom";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/app";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "./app/store/createStore";
import { Provider } from "react-redux";
import history from "./app/utils/history";

const store = createStore();

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </Router>,
  document.getElementById("root")
);

document.body.classList.add("bg-secondary");
document.body.style.backgroundImage = "var(--bs-gradient);";

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
