// @flow
import React, { PureComponent } from "react";

import Main from "../Main";
import TitlePage from "../TitlePage";

type Props = {
  individuals: Array<{}>
};

class People extends PureComponent<Props> {
  render() {
    const { individuals } = this.props;

    console.log("People", individuals);

    return (
      <Main>
        <TitlePage>People</TitlePage>
      </Main>
    );
  }
}

export default People;
