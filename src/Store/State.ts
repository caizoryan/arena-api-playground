import { State, Query, History } from "../Types/types";
import { createSignal } from "solid-js";
import { createMutable } from "solid-js/store";
import {
  body,
  refreshQuery,
  url,
} from "../components/Main/Playground/Querybuilder/QueryDisplay";
import { pagination } from "./Data";
import {
  setLoading,
  setRequested,
  setResponse,
} from "../components/Main/Playground/ResponsePainter";

export const [state, setState] = createSignal<State>("endpoint");

export const history: History[] = createMutable([]);

const domain = "https://api.are.na/v2/";

export const query = createMutable<Query>({
  endpoint: "",
  slug: "",
  action: "",
  method: "",
  token: "",
  options: [],
  pagination: [],
});

export function nextState(newState: State, query: string) {
  let ref = setQuery(query);
  refreshQuery();
  history.push({ state: state(), query: ref });
  setState(newState);
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

export const goBack = () => {
  let last = history[history.length - 1];
  setRequested(false);
  setState(last.state);
  if (last.query === "action") {
    query.options = [];
    query.method = "";
  } else if (last.query === "end") null;
  else if (last.query === "options")
    query.options.forEach((opt) => (opt.value = ""));
  else if (last.query === "pagination")
    query.pagination = structuredClone(pagination);
  else query[last.query] = "";
  history.pop();
  refreshQuery();
};

export function sendRequest() {
  setRequested(true);
  setLoading(true);

  let headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${query.token}`,
  };

  if (query.method === "GET" || query.method === "DELETE") {
    fetch(`${url()}`, {
      method: query.method,
      headers: headers,
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setResponse(res);
        console.log(res);
      });
  } else {
    fetch(`${url()}`, {
      method: query.method,
      headers: headers,
      body: `{${body()}}`,
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setResponse(res);
        console.log(res);
      });
  }
}
