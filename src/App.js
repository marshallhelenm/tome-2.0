import React from "react";
import { Grommet } from "grommet";
import theme from "./theme.js";
import Layout from "./Layout.js";
import firebase, { FirebaseContext } from "./firebase";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Login } from "grommet-icons";
import useAuth from './hooks/useAuth';

function App() {
  const user = useAuth()
  return (
    <Router>
      <FirebaseContext.Provider value={{ user, firebase }}>
        <Grommet theme={theme}>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </Layout>
        </Grommet>
      </FirebaseContext.Provider>
    </Router>
  );
}

export default App;
