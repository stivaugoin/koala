import React, { PureComponent } from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { persistCache } from "apollo-cache-persist";

import { cache, client } from "../../apollo";

import Header from "../Header";
import Home from "../Home";
import Layout from "../Layout";

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
          <Header />

          <Switch>
            <Route path="/overview" component={Layout} />
            <Route path="/people" component={Layout} />
            <Route path="/places" component={Layout} />
            <Route path="/" component={Home} />
          </Switch>
        </ApolloProvider>
      </BrowserRouter>
    );
  }
}

export default App;
