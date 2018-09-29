// @flow
import * as React from "react";

type Props = {
  children: React.Node
};

class TitlePage extends React.PureComponent<Props> {
  render() {
    const { children } = this.props;

    return (
      <div className="row">
        <div className="col-sm-12">
          <h1 className="h2 border-bottom pb-2">{children}</h1>
        </div>
      </div>
    );
  }
}

export default TitlePage;
