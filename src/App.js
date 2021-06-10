import React from "react";
import Counter from "./Components/Counter";
import CounterContextProvider from "./Context/CounterContext";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./Components/NotFound";
import "./App.scss";

export const counterProps = {
  initialCounter: 1,
  maxCount: 1000,
  minCount: 1,
};

function App() {
  return (
    <CounterContextProvider counterProps={counterProps}>
      <HashRouter basename="/quickSell">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/counter" />} />
          <Route
            path="/counter"
            render={() => <Counter counterProps={counterProps}></Counter>}
          />
          <Route component={NotFound} />
        </Switch>
      </HashRouter>
    </CounterContextProvider>
  );
}

export default React.memo(App);
