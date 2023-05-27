import {
  Match,
  For,
  Component,
  createEffect,
  createResource,
  createSignal,
  Switch,
  Show,
} from "solid-js";
import { query } from "../../../../Store/State";
import Space from "../../../Space";
import { slug } from "../../../../Store/Data";
import Select from "../../../Babies/Select";

const Slug: Component = () => {
  let paginate = { per: 5 };
  const [term, setTerm] = createSignal("");
  const [searchResults] = createResource(term, searchSlug);

  async function searchSlug(search: string) {
    return await slug
      .available()
      .search(search, paginate)
      .then((res: any) => {
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

  let ref: HTMLInputElement;
  const [active, setActive] = createSignal(false);
  createEffect(() => {
    if (query.endpoint === "group") setActive(true);
  });

  //TODO remove search capability for groups

  return (
    <>
      <div class="inline">
        <Show when={query.endpoint != "group"}>
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
        </Show>
        <div style={active() ? "opacity: 1" : "opacity: 0.4"}>
          <div>
            {query.endpoint === "group"
              ? `enter the slug of the group`
              : `or enter the ${slug.available().noun} if you already know it`}
          </div>
          <Show when={query.endpoint === "channels"}>
            <p>
              Note: if you want to create a channel, enter the title of the
              channel here.
            </p>
          </Show>
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
      <Match when={query.endpoint === "channels"}>
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
      <Match when={query.endpoint === "users"}>
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
