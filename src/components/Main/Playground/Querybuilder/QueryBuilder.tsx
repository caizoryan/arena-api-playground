import { Component, createEffect, For, Match, Show, Switch } from "solid-js";
import Endpoint from "./Endpoint";
import Slug from "./Slug";
import Action from "./Action";
import Options from "./Options";
import Pagination from "./Pagination";
import { state, sendRequest, goBack, history } from "../../../../Store/State";
import "../../../../styles/playground.css";
import { QueryDisplay } from "./QueryDisplay";
import Authenticate from "./Authenticate";
import Space from "../../../Space";

// Set and save token for authentication
// Select What first (channel/block/etc)
// Select slug if applicable
// Select what to do with it
// Select pagination option

// See results
//
function goBackTo(stage: string) {
  let lastStageCache = history[history.length - 1];
  goBack();
  if (lastStageCache.query != stage) goBackTo(stage);
}

const QueryBuilder: Component = () => {
  return (
    <div>
      <For each={history}>
        {(stage) => (
          <button
            style="opacity: .4"
            onClick={() => {
              goBackTo(stage.state);
            }}
          >
            {stage.state}
          </button>
        )}
      </For>
      <button>{state()}</button>
      <Space d={{ w: "0px", h: "15px" }}></Space>
      <Authenticate></Authenticate>
      <QueryDisplay></QueryDisplay>
      <Switch>
        <Match when={state() === "endpoint"}>
          <Endpoint />
        </Match>
        <Match when={state() === "slug"}>
          <Slug />
        </Match>
        <Match when={state() === "action"}>
          <Action />
        </Match>
        <Match when={state() === "options"}>
          <Options />
        </Match>
        <Match when={state() === "pagination"}>
          <Pagination />
        </Match>
        <Match when={state() === "end"}>
          <button
            onClick={() => {
              sendRequest();
            }}
          >
            Send Request
          </button>
        </Match>
      </Switch>
    </div>
  );
};

export default QueryBuilder;
