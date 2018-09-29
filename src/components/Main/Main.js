// @flow
import * as React from "react";

type Props = {
  children: React.Node
};

class Main extends React.PureComponent<Props> {
  render() {
    const { children } = this.props;

    return (
      <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
        {children}
      </main>
    );
  }
}

export default Main;
