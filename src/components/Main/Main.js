// @flow
import * as React from "react";
import classnames from "classnames";

type Props = {
  children: React.Node,
  className?: string
};

class Main extends React.PureComponent<Props> {
  static defaultProps = {
    className: ""
  };

  render() {
    const { children, className } = this.props;

    return (
      <main
        className={classnames("col-sm-12 pt-3 px-4", className)}
        role="main"
      >
        {children}
      </main>
    );
  }
}

export default Main;
