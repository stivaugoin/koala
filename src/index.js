import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/browser";

import App from "./components/App";
import ErrorBoundary from "./components/ErrorBoundary";
import registerServiceWorker from "./registerServiceWorker";

// eslint-disable-next-line import/no-extraneous-dependencies
import "mapbox-gl/dist/mapbox-gl.css";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://714e549c43fb4d2e9fb961cbdb8ccaff@sentry.io/1305323"
  });
}

ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById("root") // eslint-disable-line no-undef
);
registerServiceWorker();
