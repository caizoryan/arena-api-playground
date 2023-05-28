import { Component, Match, Switch } from "solid-js";
import { selected } from "../../Store/Store";
import Playground from "./Playground/Playground";
import "../../styles/main.css";
import Authenticate from "./Playground/Querybuilder/Authenticate";

const Main: Component = () => {
  return (
    <div class="main-container">
      <Switch>
        <Match when={selected() === "API V2 / Playground"}>
          <Playground />
        </Match>
        <Match when={selected() === "Authenticate"}>
          <Authenticate />
        </Match>
      </Switch>
    </div>
  );
};

export default Main;
