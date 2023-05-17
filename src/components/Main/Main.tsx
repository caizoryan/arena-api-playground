import { Component, Match, Switch } from "solid-js";
import { selected } from "../../Store/Store";
import Playground from "./Playground/Playground";
import "../../styles/main.css";

const Main: Component = () => {
  return (
    <>
      <Switch>
        <Match when={selected() === "API V2 / Playground"}>
          <Playground />
        </Match>
      </Switch>
    </>
  );
};

export default Main;
