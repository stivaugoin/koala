import React, { Fragment, PureComponent } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from "../Header";
import Home from "../Home";
import Layout from "../Layout";

class App extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Route path="/" component={Header} />
          <Switch>
            <Route path="/overview" exact component={Layout} />
            <Route path="/people" exact component={Layout} />
            <Route path="/places" exact component={Layout} />
            <Route path="/" render={props => <Home {...props} />} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
