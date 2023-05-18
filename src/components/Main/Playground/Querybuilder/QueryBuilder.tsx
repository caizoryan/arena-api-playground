import { Component, createSignal, For, Match, Switch } from "solid-js";
import "../../../../styles/playground.css";
import { createMutable } from "solid-js/store";
import Endpoint from "./Endpoint";
import Slug from "./Slug";
import Action from "./Action";

const domain = "https://api.are.na/v2/";

//
// Set and save token for authentication
// Select What first (channel/block/etc)
// Select slug if applicable
// Select what to do with it
// Select pagination option
//
// See results
//

// State
// -------------------------
export const [state, setState] = createSignal("endpoint");

export const query = createMutable({
  endpoint: "",
  slug: "",
  action: "",
  pagination: {},
});

// Utility
// -------------------------

const slug = (slug: string) => {
  query.slug = slug;
  setState("action");
};

// Components
// -------------------------

export const Select: Component<{
  name: string;
  desc: string;
  select: (select: string) => void;
}> = (props) => {
  const [hover, setHover] = createSignal(false);
  return (
    <div
      class="select"
      onMouseLeave={() => {
        setHover(false);
      }}
      onMouseEnter={() => {
        setHover(true);
      }}
      onClick={() => {
        props.select(props.name);
      }}
    >
      <div class="select-name">{props.name}</div>
      <div classList={{ "select-description": true, show: hover() }}>
        {props.desc}
      </div>
    </div>
  );
};

const QueryBuilder: Component = () => {
  return (
    <div>
      <h1>Query Builder</h1>
      <div class="query">
        <div class="domain">
          {domain + "/" + query.endpoint + "/" + query.slug}
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
      </Switch>
    </div>
  );
};

export default QueryBuilder;
