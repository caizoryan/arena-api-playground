import { Component, createSignal, Match, Show, Switch } from "solid-js";
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
type History = {
  state: State;
  query: State;
};

type State = "endpoint" | "slug" | "action" | "options" | "paginate" | "end";
export const [state, setState] = createSignal<State>("endpoint");
const history: History[] = createMutable([]);

export const nextState = (_state: State, query: string) => {
  let ref = setQuery(query);
  history.push({ state: state(), query: ref });
  setState(_state);
};

const setQuery = (q: string): State => {
  switch (state()) {
    case "endpoint":
      query.endpoint = q;
      return "endpoint";
    case "slug":
      query.slug = q;
      return "slug";
    case "action":
      query.action = q;
      return "action";
    case "options":
      query.options = q;
      return "options";
    case "paginate":
      query.pagination = q;
      return "options";
    case "end":
      return "end";
  }
};

const lastState = () => {
  let last = history[history.length - 1];
  console.log(last.state);
  setState(last.state);
  query[last.query] = "";
  history.pop();
};

export const query = createMutable({
  endpoint: "",
  slug: "",
  action: "",
  options: "",
  pagination: {},
});

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

function sendRequest() { }

const QueryBuilder: Component = () => {
  return (
    <div>
      <Show when={history.length > 0}>
        <span class="back" onClick={lastState}>
          {"<< Go back"}
        </span>
      </Show>
      <h1>Query Builder</h1>
      <div class="query">
        <div class="domain">
          {`fetch("${domain}${query.endpoint}${query.slug != "" ? "/" + query.slug : ""
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
          <Action />
        </Match>
        <Match when={state() === "paginate"}>
          <Action />
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
