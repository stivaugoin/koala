import React, { PureComponent } from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { persistCache } from "apollo-cache-persist";

import { cache, client } from "../../apollo";

import Header from "../Header";
import Home from "../Home";
import Overview from "../Overview";

class App extends PureComponent {
  state = {
    loaded: false
  };

  async componentDidMount() {
    try {
      await persistCache({
        cache,
        storage: window.localStorage // eslint-disable-line no-undef
      });
    } catch (error) {
      console.error("Error restoring Apollo cache", error);
    }

    this.setState({
      loaded: true
    });
  }

  render() {
    const { loaded } = this.state;

    if (!loaded) {
      return <div>Loading...</div>;
    }

    return (
      <BrowserRouter>
        <ApolloProvider client={client}>
          <div className="App">
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/overview" component={Overview} />
            </Switch>
          </div>
        </ApolloProvider>
      </BrowserRouter>
    );
  }
}

export default App;
