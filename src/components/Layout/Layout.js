// @flow
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Overview from "../Overview";
import People from "../People";
import Places from "../Places";
import Sidebar from "../Sidebar";

import withData from "../../utils/hoc/withData";

type Props = {
  individuals: Array<{}>
};

class Layout extends Component<Props> {
  render() {
    const { individuals } = this.props;

    return (
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <Switch>
            <Route component={Overview} exact path="/overview" />
            <Route
              exact
              render={props => <People {...props} individuals={individuals} />}
              path="/people"
            />
            <Route component={Places} exact path="/places" />
          </Switch>
        </div>
      </div>
    );
  }
}

// $FlowFixMe
export default withData(Layout);
