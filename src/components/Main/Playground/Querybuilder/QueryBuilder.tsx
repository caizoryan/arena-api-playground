import { Component, createSignal, Match, Show, Switch } from "solid-js";
import "../../../../styles/playground.css";
import { createMutable } from "solid-js/store";
import Endpoint from "./Endpoint";
import Slug from "./Slug";
import Action from "./Action";
import Options from "./Options";
import Pagination from "./Pagination";
import { TOKEN } from "../../../../env";
import { arena } from "../Playground";

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

type Options = {
  name: string;
  desc: string;
  or: boolean;
  value: string;
  options?: string[];
};

type Query = {
  endpoint: string;
  slug: string;
  action: string;
  options: Options[];
  pagination: [];
};

type State = "endpoint" | "slug" | "action" | "options" | "pagination" | "end";
export const [state, setState] = createSignal<State>("endpoint");
const history: History[] = createMutable([]);

export const query = createMutable<Query>({
  endpoint: "",
  slug: "",
  action: "",
  options: [],
  pagination: [],
});

export function nextState(_state: State, query: string) {
  let ref = setQuery(query);
  history.push({ state: state(), query: ref });
  setState(_state);
}

function setQuery(q: string): State {
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
      return "options";
    case "pagination":
      return "pagination";
    case "end":
      return "end";
  }
}

const GoBack = () => {
  let last = history[history.length - 1];
  setState(last.state);
  if (last.query === "end") null;
  else if (last.query === "options" || last.query === "pagination") null;
  else query[last.query] = "";
  history.pop();
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

function sendRequest() {
  const routes = [];
  if (query.slug) routes.push(query.slug);
  if (query.action) routes.push(query.action);
  let end = routes.join("/");

  let headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  };

  fetch(`${domain}${query.endpoint}/${end}`, {
    method: "GET",
    headers: headers,
  }).then((res) => console.log(res.json()));
}

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
