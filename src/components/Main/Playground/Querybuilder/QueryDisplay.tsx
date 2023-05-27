import { Switch, Component, For, createSignal, Match, Show } from "solid-js";
import { TOKEN } from "../../../../env";
import { actions } from "../../../../Store/Data";
import { query, state } from "../../../../Store/State";

const domain = "https://api.are.na/v2/";
export const [url, setUrl] = createSignal(domain);
const [method, setMethod] = createSignal("");
export const [body, setBody] = createSignal<string>("");

// TODO Query should refresh on every keystroke
export function refreshQuery() {
  if (query.endpoint != "") setUrl(domain + query.endpoint);
  else setUrl(domain);

  if (query.slug != "") setUrl(url() + "/" + query.slug);

  if (query.action != "") {
    setMethod(findMethod());
    let url = findUrl();
    url != "" ? setUrl(url) : null;
    setBody(findBody());
  }

  if (state() === "end" && query.method === "GET")
    query.endpoint === "search"
      ? setUrl(url() + "&" + paginationString())
      : setUrl(url() + "?" + paginationString());
}

function findMethod() {
  let tempMethod = actions
    .avalilable()
    ?.find((action) => action.name === query.action)?.method;
  return tempMethod ? tempMethod : "";
}

function findUrl() {
  let tempUrl = actions
    .avalilable()
    ?.find((action) => action.name === query.action)
    ?.url();
  return tempUrl ? tempUrl : "";
}

function findBody() {
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

function getPags() {
  let arr = [];
  for (const x of query.pagination) arr.push(x);
  return arr;
}

//TODO write case for forced refresh
// --------------------------------

function paginationString() {
  let [sort, direction, per, page, forceRefresh] = getPags();
  const attrs = [];
  if (page.value) attrs.push(`page=${page.value}`);
  if (per.value) attrs.push(`per=${per.value}`);
  if (sort.value) attrs.push(`sort=${sort.value}`);
  if (direction.value != "") attrs.push(`direction=${direction.value}`);
  // if (forceRefresh) attrs.push(`date=${this.date.now()}`);
  return attrs.join("&");
}

export const QueryDisplay: Component = () => {
  return (
    <div class="query">
      <div class="domain">
        <Switch>
          <Match when={query.action === ""}>
            {`fetch("${url()}").then((res) => console.log(res))`}
          </Match>
          <Match when={query.action != ""}>
            <>
              {`fetch("${url()}", {`}
              <br></br>
              {`headers: {`}
              <br></br>
              {`"Content-Type": "application/json",`}
              <br></br>
              {`Authorization: "Bearer ${TOKEN}",`}
              <br></br>
              {`},`}
              <br></br>
              {`method: "${method()}",`}
              <br></br>
              <Show
                when={
                  body().length > 0 &&
                  (query.method === "POST" || query.method === "PUT")
                }
              >
                <>
                  {`body: {`}
                  {body()}
                  {`}`}
                  <br></br>
                </>
              </Show>
              {`}).then((res) => console.log(res.json()))`}
            </>
          </Match>
        </Switch>
      </div>
    </div>
  );
};
