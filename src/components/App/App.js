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
            <Route
              path="/map"
              exact
              render={props => <Layout fluid {...props} />}
            />
            <Route path="/analytics" exact component={Layout} />
            <Route path="/people" exact component={Layout} />
            <Route path="/places" component={Layout} />
            <Route path="/" component={Home} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
