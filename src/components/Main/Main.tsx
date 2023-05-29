import { Component, Match, Switch } from "solid-js";
import { selected } from "../../Store/Store";
import Playground from "./Playground/Playground";
import "../../styles/main.css";
import Authenticate from "./Playground/Querybuilder/Authenticate";
import { About } from "../About";
import { Resource } from "../Resource";

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
        <Match when={selected() === "About"}>
          <About />
        </Match>
        <Match when={selected() === "Resources"}>
          <Resource />
        </Match>
      </Switch>
    </div>
  );
};

export default Main;
