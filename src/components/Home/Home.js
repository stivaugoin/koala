// @flow
import React, { Component } from "react";
import * as Sentry from "@sentry/browser";
import gedcom from "gedcom-js";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";

import type { RouterHistory } from "react-router";

import { getItem, setItem } from "../../utils/asyncLocalStorage";
import setLatLng from "../../utils/setLatLng";

type Props = {
  history: RouterHistory
};

type State = {
  isLoading: boolean,
  redirect: boolean
};

class Home extends Component<Props, State> {
  state = { isLoading: false, redirect: false };

  async componentDidMount() {
    const filename = await getItem("filename");

    if (filename) {
      this.setState({ redirect: true });
    }
  }

  handleChange = event => {
    const { history } = this.props;
    const file = event.target.files[0];

    if (file) {
      this.setState({ isLoading: true });

      // eslint-disable-next-line no-undef
      const fileReader = new FileReader();

      fileReader.onload = async fileContent => {
        const { result } = fileContent.currentTarget;
        const parsed = gedcom.parse(result);

        try {
          // Add coordinates to places
          const newPlaces = await setLatLng(parsed.places);

          // Save data into local storage
          await Promise.all([
            setItem("filename", file.name),
            setItem("individuals", JSON.stringify(parsed.individuals)),
            setItem("places", JSON.stringify(newPlaces))
          ]);

          history.push("/overview");
        } catch (error) {
          this.setState({ isLoading: false });
          Sentry.captureException(error);
        }
      };

      fileReader.readAsText(file);
    }
  };

  render() {
    const { isLoading, redirect } = this.state;

    if (redirect) {
      return <Redirect to="/overview" />;
    }

    return (
      <main role="main" className="container pt-5">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="jumbotron py-5">
            <h1 className="display-6 mb-4">Visualize your genealogy tree</h1>
            <div>
              <input type="file" accept=".ged" onChange={this.handleChange} />
            </div>
          </div>
        )}
      </main>
    );
  }
}

export default withRouter(Home);
