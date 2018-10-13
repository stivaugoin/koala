// @flow
import * as React from "react";
import ReactTooltip from "react-tooltip";
import uuidv4 from "uuid/v4";

type Props = {
  children: React.Node,
  value: string
};

class Tooltip extends React.PureComponent<Props> {
  render() {
    const { children, value } = this.props;
    const id = uuidv4();

    return (
      <React.Fragment>
        {/* $FlowFixMe */}
        {React.cloneElement(children, { "data-tip": true, "data-for": id })}
        <ReactTooltip id={id} place="top" type="dark" effect="solid">
          <span>{value || "---"}</span>
        </ReactTooltip>
      </React.Fragment>
    );
  }
}

export default Tooltip;
