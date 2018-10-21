// @flow
import * as React from "react";
import * as Sentry from "@sentry/browser";

import { getItem } from "../asyncLocalStorage";

type Props = {};

type State = {
  data: {
    individuals?: Array<{}>,
    places?: Array<{}>
  },
  isLoading: boolean
};

type Key = "individuals" | "places";

const withData = ({ items }: { items: Array<Key> }) => (
  WrappedComponent: any
) =>
  class extends React.PureComponent<Props, State> {
    constructor(props: Props) {
      super(props);

      // $FlowFixMe
      if (items.includes("filename")) {
        throw new Error("Use the HoC withFilename instead of this one.");
      }
    }

    state = {
      data: {},
      isLoading: true
    };

    async componentDidMount() {
      const data = {};

      try {
        await Promise.all(
          items.map(async item => {
            data[item] = JSON.parse(await getItem(item));
          })
        );

        this.setState({
          data,
          isLoading: false
        });
      } catch (error) {
        Sentry.captureException(error);
      }
    }

    render() {
      const { data, isLoading } = this.state;

      return (
        // $FlowFixMe
        <WrappedComponent {...this.props} data={data} isLoading={isLoading} />
      );
    }
  };

export default withData;
