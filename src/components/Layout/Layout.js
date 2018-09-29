// @flow
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Overview from "../Overview";
import People from "../People";
import Places from "../Places";
import Sidebar from "../Sidebar";

import withFileLoaded from "../../utils/hoc/withFileLoaded";

type Props = {};

class Layout extends Component<Props> {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <Switch>
            <Route path="/overview" component={Overview} />
            <Route path="/people" component={People} />
            <Route path="/places" component={Places} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withFileLoaded(Layout);
