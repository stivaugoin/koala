// @flow
import * as React from "react";

import { getItem } from "../asyncLocalStorage";

type Props = {};

type State = {
  data: Array<{}>,
  isLoading: boolean
};

type Key = "individuals" | "places";

const withData = ({ key }: { key: Key }) => (WrappedComponent: any) =>
  class extends React.PureComponent<Props, State> {
    constructor(props: Props) {
      super(props);

      if (!key) {
        throw new Error("Please provide a key.");
      }

      // $FlowFixMe
      if (key === "filename") {
        throw new Error("Use the HoC withFilename instead of this one.");
      }
    }

    state = {
      data: [],
      isLoading: true
    };

    async componentDidMount() {
      try {
        const data = await getItem(key);

        this.setState({
          data: JSON.parse(data) || [],
          isLoading: false
        });
      } catch (error) {
        console.error(error);
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
