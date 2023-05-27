import { State, Query, History } from "../Types/types";
import { createEffect, createSignal } from "solid-js";
import { createMutable } from "solid-js/store";
import { TOKEN } from "../env";
import {
  body,
  refreshQuery,
  url,
} from "../components/Main/Playground/Querybuilder/QueryDisplay";
import { pagination } from "./Data";

export const [state, setState] = createSignal<State>("endpoint");

export const history: History[] = createMutable([]);

const domain = "https://api.are.na/v2/";

export const query = createMutable<Query>({
  endpoint: "",
  slug: "",
  action: "",
  method: "",
  options: [],
  pagination: [],
});

export function nextState(_state: State, query: string) {
  let ref = setQuery(query);
  history.push({ state: state(), query: ref });
  setState(_state);
  refreshQuery();
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

export const GoBack = () => {
  let last = history[history.length - 1];
  setState(last.state);
  if (last.query === "action") {
    query.options = [];
    query.method = "";
  }
  if (last.query === "end") null;
  else if (last.query === "options")
    query.options.forEach((opt) => (opt.value = ""));
  else if (last.query === "pagination")
    query.pagination = structuredClone(pagination);
  else query[last.query] = "";
  history.pop();
  refreshQuery();
};

export function sendRequest() {
  const routes = [];
  if (query.slug) routes.push(query.slug);
  if (query.action) routes.push(query.action);
  let end = routes.join("/");

  let headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  };

  let bodyString = "";

  for (let i = 0; i < body().length; i++) {
    let x = body()[i];
    if (x.length > 0) bodyString += x;
    if (i != body().length - 1) bodyString += ",";
  }

  if (query.method === "GET" || query.method === "DELETE") {
    fetch(`${url()}`, {
      method: query.method,
      headers: headers,
    }).then((res) => console.log(res.json()));
  } else {
    fetch(`${url()}`, {
      method: query.method,
      headers: headers,
      body: `{${bodyString}}`,
    }).then((res) => console.log(res.json()));
  }

  // fetch("https://api.are.na/v2/channel/fetch-css-test", {
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: "Bearer uD5qI_IeG1MPnRFHlqPR4d1dugH88CEqh--pHtcYXrs",
  //   },
  //   method: "GET",
  // }).then((res) => console.log(res));
}
