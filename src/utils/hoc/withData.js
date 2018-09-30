// @flow
import * as React from "react";
import { Redirect } from "react-router-dom";

import { getItem } from "../asyncLocalStorage";

type Props = {};

type State = {
  filename: string,
  individuals: Array<{}>,
  isLoading: boolean,
  places: Array<{}>,
  redirect: boolean
};

function withData(WrappedComponent: React.Node) {
  return class extends React.PureComponent<Props, State> {
    state = {
      filename: "",
      individuals: [],
      isLoading: true,
      places: [],
      redirect: false
    };

    async componentDidMount() {
      try {
        const [filename, individuals, places] = await Promise.all([
          await getItem("filename"),
          await getItem("individuals"),
          await getItem("places")
        ]);

        console.log(filename, individuals, places);
        if (!filename || !individuals || !places) {
          this.setState({ redirect: true });
          return;
        }

        this.setState({
          filename,
          individuals,
          isLoading: false,
          places
        });
      } catch (error) {
        console.error(error);
      }
    }

    render() {
      const { filename, individuals, isLoading, places, redirect } = this.state;

      if (redirect) {
        return <Redirect to="/" />;
      }

      if (isLoading) {
        return "Loading...";
      }

      return (
        // $FlowFixMe
        <WrappedComponent
          filename={filename}
          individuals={individuals}
          places={places}
        />
      );
    }
  };
}

export default withData;
