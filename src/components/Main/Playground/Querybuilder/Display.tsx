import { Switch, Component, createSignal, Match, Show } from "solid-js";
import { actions } from "../../../../Store/Data";
import { query, state } from "../../../../Store/State";

const domain = "https://api.are.na/v2/";
export const [url, setUrl] = createSignal(domain);
const [method, setMethod] = createSignal("");
export const [body, setBody] = createSignal<string>("");

export function refreshQuery() {
  if (query.endpoint != "") setUrl(domain + query.endpoint);
  else setUrl(domain);

  if (query.slug != "") setUrl(url() + "/" + query.slug);

  if (query.action != "") {
    setMethod(getMethod());
    let url = getActionUrl();
    url != "" ? setUrl(url) : null;
    setBody(getBody());
  }

  if (state() === "pagination" && query.method === "GET")
    query.endpoint === "search"
      ? setUrl(url() + "&" + paginationString())
      : setUrl(url() + "?" + paginationString());
}

function getMethod() {
  let tempMethod = actions
    .avalilable()
    ?.find((action) => action.name === query.action)?.method;
  return tempMethod ? tempMethod : "";
}

function getActionUrl() {
  let tempUrl = actions
    .avalilable()
    ?.find((action) => action.name === query.action)
    ?.url();
  return tempUrl ? tempUrl : "";
}

function getBody() {
  let options = query.options;

  let bodyString = "";

  for (let i = 0; i < options.length; i++) {
    let option = options[i];
    if (option.value != "" && option.name != "comment_id") {
      bodyString += `"${option.name}":"${option.value}",`;
    }
  }
  if (query.endpoint === "search") return "";
  return bodyString.substring(0, bodyString.length - 1);
}

function getPagination() {
  let arr = [];
  for (const x of query.pagination) arr.push(x);
  return arr;
}

//TODO write case for forced refresh
// --------------------------------

function paginationString() {
  let [sort, direction, per, page] = getPagination();
  const attrs = [];
  if (page.value) attrs.push(`page=${page.value}`);
  if (per.value) attrs.push(`per=${per.value}`);
  if (sort.value) attrs.push(`sort=${sort.value}`);
  if (direction.value != "") attrs.push(`direction=${direction.value}`);
  // if (forceRefresh) attrs.push(`date=${this.date.now()}`);
  return attrs.join("&");
}

export const Display: Component = () => {
  return (
    <div class="query">
      <div class="domain">
        <Switch>
          <Match when={query.action === ""}>
            {`fetch("${url()}", {`}
            <br></br>
            &nbsp&nbsp{`headers: {`}
            <br></br>
            &nbsp&nbsp&nbsp&nbsp{`"Content-Type": "application/json",`}
            <br></br>
            &nbsp&nbsp&nbsp&nbsp{`Authorization: "Bearer ${query.token}"`}
            <br></br>
            &nbsp&nbsp{`},`}
            <br></br>
            {`})`}
            <br></br>
            {`.then((res) => res.json())`}
            <br></br>
            {`.then((res) => console.log(res))`}
          </Match>
          <Match when={query.action != ""}>
            <>
              {`fetch("${url()}", {`}
              <br></br>
              &nbsp&nbsp{`headers: {`}
              <br></br>
              &nbsp&nbsp&nbsp&nbsp{`"Content-Type": "application/json",`}
              <br></br>
              &nbsp&nbsp&nbsp&nbsp{`Authorization: "Bearer ${query.token}",`}
              <br></br>
              &nbsp&nbsp{`},`}
              <br></br>
              &nbsp&nbsp{`method: "${method()}",`}
              <br></br>
              <Show
                when={
                  body().length > 0 &&
                  (query.method === "POST" || query.method === "PUT")
                }
              >
                <>
                  &nbsp&nbsp{`body: '{${body()}}'`}
                  <br></br>
                </>
              </Show>
              {`})`}
              <br></br>
              {`.then((res) => res.json())`}
              <br></br>
              {`.then((res) => console.log(res))`}
            </>
          </Match>
        </Switch>
      </div>
    </div>
  );
};
