// @flow
import React, { PureComponent } from "react";

import Header from "./components/Header";
import Home from "./components/Home";

type Props = {};

class App extends PureComponent<Props> {
  render() {
    return (
      <div className="App">
        <Header />
        <Home />
      </div>
    );
  }
}

export default App;
