// @flow
import React, { PureComponent } from "react";
import { Container, Input, Jumbotron } from "reactstrap";
import { Mutation } from "react-apollo";

import { mutationImportFile } from "../../graphql";

import "./styles.css";

type Props = {};

class Home extends PureComponent<Props> {
  render() {
    return (
      <Container className="Home">
        <Jumbotron className="pb-5 pt-5">
          <h1 className="display-6 mb-4">Visualize your genealogy tree</h1>
          <div>
            <Mutation
              mutation={mutationImportFile}
              onCompleted={() => {
                console.log("Importation done!");
              }}
            >
              {(importFile, { loading, error }) => {
                if (loading) return "loading...";
                if (error) return `error: ${error.message}`;

                return (
                  <Input
                    type="file"
                    accept=".ged"
                    onChange={event => {
                      importFile({
                        variables: { file: event.target.files[0] }
                      });
                    }}
                  />
                );
              }}
            </Mutation>
          </div>
        </Jumbotron>
      </Container>
    );
  }
}

export default Home;
