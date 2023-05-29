import { Component, For, Match, Switch } from "solid-js";
import Endpoint from "./Endpoint";
import Slug from "./Slug";
import Action from "./Action";
import Options from "./Options";
import Pagination from "./Pagination";
import {
  state,
  sendRequest,
  goBackTo,
  history,
  authenticated,
  query,
} from "../../../../Store/State";
import "../../../../styles/playground.css";
import { Display } from "./Display";

// Set and save token for authentication
// Select What first (channel/block/etc)
// Select slug if applicable
// Select what to do with it
// Select pagination option

// See results

const Builder: Component = () => {
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
      <Display />
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
            class={authRequired() ? "disabled" : ""}
            onClick={() => {
              authRequired() ? null : sendRequest();
            }}
          >
            {authRequired() ? "Requires Authetication" : "Send Request"}
          </button>
        </Match>
      </Switch>
    </div>
  );
};

function authRequired() {
  return (
    !authenticated().auth &&
    (query.method !== "GET" ||
      query.endpoint === "me" ||
      (query.endpoint === "users" && query.action != "get"))
  );
}
export default Builder;
