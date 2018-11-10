// @flow
import React, { Component } from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import withFilename, { type WithFilename } from "../../utils/hoc/withFilename";

import Overview from "../Overview";
import People from "../People";
import Place from "../Place";
import Places from "../Places";
import Map from "../Map";
import Analytics from "../Analytics";

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
      <div className="container">
        <div className="row" style={{ marginTop: "56px", paddingTop: "1em" }}>
          <Switch>
            <Route exact component={Overview} path="/overview" />
            <Route exact component={Map} path="/map" />
            <Route exact component={Analytics} path="/analytics" />
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
