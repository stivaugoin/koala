// @flow
import React, { Fragment, PureComponent } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";

import Main from "../Main";
import TitlePage from "../TitlePage";

import { getOverviewQuery } from "../../graphql";

type Props = {};

class Overview extends PureComponent<Props> {
  // eslint-disable-next-line class-methods-use-this
  renderCard({
    path,
    title,
    value
  }: {
    path?: string,
    title: string,
    value: number
  }) {
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

  render() {
    return (
      <Main>
        <TitlePage>Overview</TitlePage>

        <Query query={getOverviewQuery}>
          {({ data }) => (
            <Fragment>
              <div className="row">
                <div className="col-sm-4">
                  {this.renderCard({
                    path: "/people",
                    title: "Unique People",
                    value: data.overview.nbIndividuals
                  })}
                </div>
                <div className="col-sm-4">
                  {this.renderCard({
                    path: "/places",
                    title: "Unique Places",
                    value: data.overview.nbPlaces
                  })}
                </div>
                <div className="col-sm-4">
                  {this.renderCard({
                    path: "/unique-lastname",
                    title: "Unique Last Name",
                    value: data.overview.nbLastName
                  })}
                </div>
              </div>

              <div className="row">
                <div className="col-sm-4">
                  {this.renderCard({
                    title: "Most Popular Last Name",
                    value: data.overview.popularLastName
                  })}
                </div>
                <div className="col-sm-8">
                  {this.renderCard({
                    title: "Most Popular Place",
                    value: data.overview.popularPlace
                  })}
                </div>
              </div>
            </Fragment>
          )}
        </Query>
      </Main>
    );
  }
}

export default Overview;
