import { Component, Match, Show, Switch } from "solid-js";
import Endpoint from "./Endpoint";
import Slug from "./Slug";
import Action from "./Action";
import Options from "./Options";
import Pagination from "./Pagination";
import { state, sendRequest, GoBack, query } from "../../../../Store/State";
import "../../../../styles/playground.css";

const domain = "https://api.are.na/v2/";

// Set and save token for authentication
// Select What first (channel/block/etc)
// Select slug if applicable
// Select what to do with it
// Select pagination option
//
// See results

const QueryBuilder: Component = () => {
  return (
    <div>
      <Show when={history.length > 0}>
        <span class="back" onClick={GoBack}>
          {"<< Go back"}
        </span>
      </Show>
      <h1>Query Builder</h1>
      <div class="query">
        <div class="domain">
          {`fetch("${domain}${query.endpoint}${
            query.slug != "" ? "/" + query.slug : ""
          }").then((res) => console.log(res))`}
        </div>
      </div>
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
          <p
            onClick={() => {
              sendRequest();
            }}
          >
            Send Request
          </p>
        </Match>
      </Switch>
    </div>
  );
};

export default QueryBuilder;
