// @flow
import React, { PureComponent } from "react";

import Main from "../Main";
import TitlePage from "../TitlePage";

type Props = {};

class Places extends PureComponent<Props> {
  render() {
    return (
      <Main>
        <TitlePage>Places</TitlePage>
      </Main>
    );
  }
}

export default Places;
