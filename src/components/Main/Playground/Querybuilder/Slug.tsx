import {
  Match,
  For,
  Component,
  createEffect,
  createResource,
  createSignal,
  Switch,
} from "solid-js";
import { nextState, query, Select } from "./QueryBuilder";
import { arena } from "../Playground";
import Space from "../../../Space";

const slug = {
  use: (slug: string) => nextState("action", slug),
  available: () => {
    switch (query.endpoint) {
      case "channel":
        return {
          type: "text",
          search: arena.search.channels,
          end: "channels",
          noun: "slug",
        };
      case "block":
        return {
          type: "number",
          search: arena.search.blocks,
          end: "blocks",
          noun: "id",
        };
      case "user":
        return {
          type: "number",
          search: arena.search.users,
          end: "users",
          noun: "id",
        };
      case "group":
        return {
          type: "text",
          search: arena.search.channels,
          end: "users",
          noun: "slug",
        };
      default:
        return {
          type: "text",
          search: arena.search.channels,
          end: "channels",
          noun: "slug",
        };
    }
  },
};
const Slug: Component = () => {
  let paginate = { per: 5 };
  const [term, setTerm] = createSignal("");
  const [searchResults] = createResource(term, searchSlug);

  async function searchSlug(search: string) {
    return await slug
      .available()
      .search(search, paginate)
      .then((res) => {
        switch (slug.available().end) {
          case "channels":
            return res.channels;
          case "blocks":
            return res.blocks;
          case "users":
            return res.users;
        }
      });
  }

  createEffect(() => {
    console.log(searchResults());
  });
  createEffect(() => {
    console.log(term());
  });

  let ref: HTMLInputElement;
  const [active, setActive] = createSignal(false);

  return (
    <>
      <div class="inline">
        <div style={active() ? "opacity: .4" : "opacity: 1.0"}>
          <div>
            Search for the {slug.available()?.noun} for your {query.endpoint}
          </div>
          <input
            type="text"
            onInput={(e) => setTerm(e.currentTarget.value)}
            onFocus={() => setActive(false)}
          ></input>
        </div>
        <Space d={{ w: "40px", h: "10px" }} />
        <div style={active() ? "opacity: 1" : "opacity: 0.4"}>
          <div>or enter the {slug.available().noun} if you already know it</div>
          <input type="text" ref={ref!} onFocus={() => setActive(true)}></input>
          <button
            onClick={() => {
              slug.use(ref?.value);
            }}
          >
            Set {slug.available().noun}
          </button>
        </div>
      </div>
      <div style={"display: flex; flex-wrap: wrap"}>
        <For each={searchResults()}>
          {(result) => <Results result={result} />}
        </For>
      </div>
    </>
  );
};

const Results: Component<{ result: any }> = (props) => {
  return (
    <Switch>
      <Match when={query.endpoint === "channel"}>
        <Select
          name={props.result.title}
          desc={props.result.slug}
          select={() => slug.use(props.result.slug)}
        />
      </Match>
      <Match when={query.endpoint === "block"}>
        <Select
          name={props.result.title}
          desc={props.result.id}
          select={() => slug.use(props.result.id)}
        />
      </Match>
      <Match when={query.endpoint === "user"}>
        <Select
          name={props.result.username}
          desc={props.result.id}
          select={() => slug.use(props.result.id)}
        />
      </Match>
    </Switch>
  );
};

export default Slug;
