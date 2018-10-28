// @flow
import React, { Component } from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import withFilename, { type WithFilename } from "../../utils/hoc/withFilename";

import Overview from "../Overview";
import People from "../People";
import Place from "../Place";
import Places from "../Places";
import Sidebar from "../Sidebar";

type Props = {
  ...WithFilename
};

class Layout extends Component<Props> {
  render() {
    const { filename, isLoading } = this.props;

    if (isLoading) {
      return <h1>Loading...</h1>;
    }

    if (!filename) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <Switch>
            <Route exact component={Overview} path="/overview" />
            <Route exact component={People} path="/people" />
            <Route exact component={Place} path="/places/:id" />
            <Route exact component={Places} path="/places" />
          </Switch>
        </div>
      </div>
    );
  }
}

// $FlowFixMe
export default withFilename(Layout);
