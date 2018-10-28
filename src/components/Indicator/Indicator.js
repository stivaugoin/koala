// @flow
import React, { PureComponent } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";

type Props = {
  path?: string,
  title: string,
  value: number | string
};

class Indicator extends PureComponent<Props> {
  static defaultProps = {
    path: undefined
  };

  render() {
    const { path, title, value } = this.props;

    return (
      <div className="card text-center">
        <div className="card-body d-flex flex-column justify-content-center">
          <h5
            className={classnames("card-title", {
              h1: typeof value === "number",
              h3: typeof value === "string"
            })}
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis"
            }}
          >
            {value}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">{title}</h6>
        </div>
        {path && (
          <div className="card-footer">
            <Link to={path} className="card-link">
              View list
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default Indicator;
