import React from "react";
import ReactDom from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import Reducers from "./Reducers";
import ReduxThunk from "redux-thunk";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

ReactDom.render(
  <div>
    <Provider
      store={createStore(
        Reducers,
        composeEnhancers(applyMiddleware(ReduxThunk))
      )}
    >
      <App />
    </Provider>
  </div>,
  document.querySelector("#root")
);
