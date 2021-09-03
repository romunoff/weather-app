import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { MainPage } from "./pages/MainPage";
import { CityPage } from "./pages/CityPage";
import "antd/dist/antd.css";
import "./styles.css";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/:city" component={CityPage} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
