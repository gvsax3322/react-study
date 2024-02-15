import React from "react";
import { Provider } from "react-redux";

import { Counter } from "./components/Counter";
import { store } from "./store/store";

const Main = () => {
  return (
    <div>
      <Provider store={store}>
        <Counter />
      </Provider>
    </div>
  );
};

export default Main;
