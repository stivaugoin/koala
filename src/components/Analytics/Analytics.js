// @flow
import React, { PureComponent } from "react";

import Main from "../Main";
import TitlePage from "../TitlePage";

type Props = {};

class Analytics extends PureComponent<Props> {
  render() {
    return (
      <Main>
        <TitlePage>Analytics</TitlePage>
      </Main>
    );
  }
}

export default Analytics;
