import { Switch, Component, createSignal, Match } from "solid-js";
import { actions } from "../../../../Store/Data";
import { query } from "../../../../Store/State";

const domain = "https://api.are.na/v2/";
const [url, setUrl] = createSignal(domain);
const [method, setMethod] = createSignal("");
let body: string;

export function refreshQuery() {
  // when endpoint is selected
  if (query.endpoint != "") setUrl(domain + query.endpoint);
  else setUrl(domain);

  // when slug is selected
  if (query.slug != "") setUrl(url() + "/" + query.slug);

  // when action is selected
  if (query.action != "") {
    setMethod(findMethod(query.action));
    let swap = findUrl(query.action);
    swap != "" ? setUrl(swap) : null;
  }
  // -- when options are selected
  // when pagination is selected
}

function findMethod(action: string) {
  let tempMethod = actions
    .avalilable()
    ?.find((action) => action.name === query.action)?.method;
  return tempMethod ? tempMethod : "";
}

function findUrl(action: string) {
  let tempUrl = actions
    .avalilable()
    ?.find((action) => action.name === query.action)
    ?.url();
  console.log(tempUrl);
  return tempUrl ? tempUrl : "";
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
              {`method: ${method()}`}
              <br></br>
              {`}).then((res) => console.log(res))`}
            </>
          </Match>
        </Switch>
      </div>
    </div>
  );
};
