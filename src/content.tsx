import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App";
import { APP_PARENT_SELECTOR, APP_CONTAINER_ID } from "./config";

const appContainer: HTMLElement = document.createElement("div");

appContainer.setAttribute("id", APP_CONTAINER_ID);
document.querySelector(APP_PARENT_SELECTOR).prepend(appContainer);

ReactDOM.render(<App />, document.getElementById(APP_CONTAINER_ID));
