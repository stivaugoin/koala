// @flow
import React, { PureComponent } from "react";

import Main from "../Main";
import TitlePage from "../TitlePage";

type Props = {};

class Map extends PureComponent<Props> {
  render() {
    return (
      <Main>
        <TitlePage>Map</TitlePage>
      </Main>
    );
  }
}

export default Map;
