// @flow
import * as React from "react";
import * as Sentry from "@sentry/browser";

type Props = {
  children: React.Node
};

type State = {
  hasError: boolean
};

export default class ErrorBoundary extends React.PureComponent<Props, State> {
  state = {
    hasError: false
  };

  componentDidCatch(error: any) {
    this.setState({ hasError: true });
    Sentry.captureException(error);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return children;
  }
}
