// @flow
import React, { PureComponent } from "react";
import { Mutation, Query } from "react-apollo";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";

import type { RouterHistory } from "react-router";

import { getFilenameQuery, mutationImportFile } from "../../graphql";

type Props = {
  history: RouterHistory
};

class Home extends PureComponent<Props> {
  render() {
    const { history } = this.props;

    return (
      <Query query={getFilenameQuery}>
        {({ data, error, loading }) => {
          if (loading) return "loading...";
          if (error) return `error: ${error.message}`;

          if (data && data.app && data.app.filename) {
            return <Redirect to="/overview" />;
          }

          return (
            <main role="main" className="container pt-5">
              <div className="jumbotron py-5">
                <h1 className="display-6 mb-4">
                  Visualize your genealogy tree
                </h1>
                <div>
                  <Mutation
                    mutation={mutationImportFile}
                    onCompleted={() => {
                      history.push("/overview");
                    }}
                  >
                    {(importFile, importationState) => {
                      if (importationState.loading) return "loading...";
                      if (importationState.error)
                        return `error: ${importationState.error.message}`;

                      return (
                        <input
                          type="file"
                          accept=".ged"
                          onChange={event => {
                            importFile({
                              variables: { file: event.target.files[0] }
                            });
                          }}
                        />
                      );
                    }}
                  </Mutation>
                </div>
              </div>
            </main>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(Home);
