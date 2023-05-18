import {
  Match,
  For,
  Component,
  createEffect,
  createResource,
  createSignal,
  Switch,
} from "solid-js";
import { query, Select, setState } from "./QueryBuilder";
import { arena } from "../Playground";

const slug = {
  use: (slug: string) => {
    query.slug = slug;
    setState("action");
  },
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

  return (
    <>
      <div>
        Search for the {slug.available()?.noun} for your {query.endpoint}
      </div>
      <input
        type="text"
        onInput={(e) => setTerm(e.currentTarget.value)}
      ></input>
      <div>or enter the {slug.available().noun} if you already know it</div>
      <input type="text" ref={ref!}></input>
      <button
        onClick={() => {
          slug.use(ref?.value);
        }}
      >
        Set {slug.available().noun}
      </button>

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
