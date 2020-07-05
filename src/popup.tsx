import * as React from "react";
import * as ReactDOM from "react-dom";
import Menu from "./components/Menu";
import Error from "./components/Error";
import { G_DOMAIN } from "./config";

chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  const tab: any = tabs[0];
  const url: any = new URL(tab.url);

  // Load the app into the popup.
  // Show an error screen if wrong domain.
  ReactDOM.render(
    url.hostname === G_DOMAIN ? <Menu tabID={tab.id} /> : <Error />,
    document.getElementById("popup")
  );
});
