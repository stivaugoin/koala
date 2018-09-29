// @flow
import React, { PureComponent } from "react";

import Main from "../Main";
import TitlePage from "../TitlePage";

type Props = {};

class People extends PureComponent<Props> {
  render() {
    return (
      <Main>
        <TitlePage>People</TitlePage>
      </Main>
    );
  }
}

export default People;
