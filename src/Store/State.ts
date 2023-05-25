import { State, Query, History } from "../Types/types";
import { createSignal } from "solid-js";
import { createMutable } from "solid-js/store";
import { TOKEN } from "../env";
import { refreshQuery } from "../components/Main/Playground/Querybuilder/QueryDisplay";

export const [state, setState] = createSignal<State>("endpoint");

const history: History[] = createMutable([]);

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
  if (last.query === "action") query.method = "";
  if (last.query === "end") null;
  else if (last.query === "options" || last.query === "pagination") null;
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

  fetch(`${domain}${query.endpoint}/${end}`, {
    method: "GET",
    headers: headers,
  }).then((res) => console.log(res.json()));
}
