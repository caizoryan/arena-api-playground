import { Switch, Component, For, createSignal, Match, Show } from "solid-js";
import { TOKEN } from "../../../../env";
import { actions } from "../../../../Store/Data";
import { query, state } from "../../../../Store/State";

const domain = "https://api.are.na/v2/";
export const [url, setUrl] = createSignal(domain);
const [method, setMethod] = createSignal("");
const [body, setBody] = createSignal<string[]>([]);

// TODO need to add query entry for search

export function refreshQuery() {
  // when endpoint is selected
  if (query.endpoint != "") setUrl(domain + query.endpoint);
  else setUrl(domain);

  // when slug is selected
  if (query.slug != "") setUrl(url() + "/" + query.slug);

  // when action is selected
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
  let tempBody: string[] = [];
  let options = query.options;

  if (query.endpoint === "search") return [];
  if (options) {
    options.forEach((option) => {
      option.value
        ? tempBody.push("'" + option.name + "' : '" + option.value + "'")
        : null;
    });
    return tempBody;
  }
  return [];
}

function getPags() {
  let arr = [];
  for (const x of query.pagination) arr.push(x);
  return arr;
}

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
              <Show when={body().length > 0}>
                <>
                  {`body: {`}
                  <For each={body()}>
                    {(body) => (
                      <>
                        <br></br>
                        {body + ","}
                      </>
                    )}
                  </For>
                  <br></br>
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
