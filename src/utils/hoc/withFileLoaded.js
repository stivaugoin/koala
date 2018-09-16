import React, { PureComponent } from "react";
import { Query } from "react-apollo";
import { Redirect } from "react-router-dom";

import { getFilenameQuery } from "../../graphql";

function withFileLoaded(WrappedComponent) {
  return class extends PureComponent {
    render() {
      return (
        <Query query={getFilenameQuery}>
          {({ data, error, loading }) => {
            if (loading) return "loading...";
            if (error) return `error: ${error.message}`;

            if (!data || !data.app || !data.app.filename) {
              return <Redirect to="/" />;
            }

            return <WrappedComponent />;
          }}
        </Query>
      );
    }
  };
}

export default withFileLoaded;
