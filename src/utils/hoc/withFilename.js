// @flow
import * as React from "react";

import { getItem } from "../asyncLocalStorage";

type Props = {};

type State = {|
  filename: string,
  isLoading: boolean
|};

export type WithFilename = State;

function withFilename(WrappedComponent: React.Node) {
  return class extends React.PureComponent<Props, State> {
    state = {
      filename: "",
      isLoading: true
    };

    async componentDidMount() {
      try {
        const filename = await getItem("filename");

        this.setState({
          filename,
          isLoading: false
        });
      } catch (error) {
        console.error(error);
      }
    }

    render() {
      const { filename, isLoading } = this.state;

      return (
        // $FlowFixMe
        <WrappedComponent
          {...this.props}
          filename={filename}
          isLoading={isLoading}
        />
      );
    }
  };
}

export default withFilename;
