import { Component, createSignal, For, Match, Switch } from "solid-js";
import "../../../styles/playground.css";
import { ArenaClient } from "../../../Arena/arenaService";
import { TOKEN } from "../../../env";
import { createMutable } from "solid-js/store";

const arena = new ArenaClient({ token: TOKEN });
const domain = "https://api.are.na/v2/";

//
// Set and save token for authentication
// Select What first (channel/block/etc)
// Select slug if applicable
// Select what to do with it
// Select pagination option
//
// See results
//

// State
// -------------------------
const [state, setState] = createSignal("endpoint");

const query = createMutable({
  endpoint: "",
  slug: "",
  action: "",
  pagination: {},
});

// Utility
// -------------------------
const actions = () => {
  switch (query.endpoint) {
    case "channel":
      return [
        { name: "sort", description: "" },
        { name: "connect", description: "" },
        { name: "disconnect", description: "" },
        { name: "contents", description: "" },
        { name: "connections", description: "" },
        { name: "create", description: "" },
        { name: "update", description: "" },
        { name: "createBlock", description: "" },
        { name: "get", description: "" },
        { name: "delete", description: "" },
        { name: "thumb", description: "" },
      ];
    case "block":
      return [{ name: "monkey", description: "" }];
  }
};

const endpoint = () => {
  return {
    use: (endpoint: string) => {
      query.endpoint = endpoint;
      if (endpoint === "channels" || endpoint === "me") setState("action");
      else setState("slug");
    },
    available: () => {
      return [
        {
          name: "channels",
          description: "Get channels of authenticated user",
          auth: true,
        },
        {
          name: "me",
          description: "Get authenticated user details",
          auth: true,
        },
        {
          name: "user",
          description: "Access user details based on user id",
          auth: false,
        },
        {
          name: "block",
          description: "Access block based on block id",
          auth: false,
        },
        {
          name: "group",
          description: "Acess group details based on group slug",
          auth: false,
        },
        {
          name: "channel",
          description: "Access channels using a channel slug",
          auth: false,
        },
      ];
    },
  };
};

const slug = (slug: string) => {
  query.slug = slug;
  setState("action");
};

// Components
// -------------------------
const Endpoint: Component = () => {
  return (
    <>
      <div>Choose Endpoint, the are.na API has 6 endpoints to choose from</div>
      <div style={"display: flex; flex-wrap: wrap"}>
        <For each={endpoint().available()}>
          {(option) => (
            <Select name={option.name} description={option.description} />
          )}
        </For>
      </div>
    </>
  );
};

const Slug: Component = () => {
  let ref: any;
  return (
    <div>
      <div>Enter slug</div>
      <input ref={ref} type="text"></input>
      <div>What is slug</div>
      <button
        onClick={() => {
          slug(ref.value);
        }}
      >
        click
      </button>
      <div>Search for</div>
    </div>
  );
};

const Action: Component = () => {
  return (
    <>
      <div>Choose an action</div>
      <div style={"display: flex; max-width: 70vw;flex-wrap: wrap"}>
        <For each={actions()}>
          {(option) => (
            <Select name={option.name} description={option.description} />
          )}
        </For>
      </div>
    </>
  );
};

const Select: Component<{ name: string; description: string }> = (props) => {
  const [hover, setHover] = createSignal(false);
  return (
    <div
      class="select"
      onMouseLeave={() => {
        setHover(false);
      }}
      onMouseEnter={() => {
        setHover(true);
      }}
      onClick={() => {
        endpoint().use(props.name);
      }}
    >
      <div class="select-name">{props.name}</div>
      <div classList={{ "select-description": true, show: hover() }}>
        {props.description}
      </div>
    </div>
  );
};

const QueryBuilder: Component = () => {
  return (
    <div>
      <h1>Query Builder</h1>
      <div class="query">
        <div class="domain">
          {domain + "/" + query.endpoint + "/" + query.slug}
        </div>
      </div>
      <Switch>
        <Match when={state() === "endpoint"}>
          <Endpoint />
        </Match>
        <Match when={state() === "slug"}>
          <Slug />
        </Match>
        <Match when={state() === "action"}>
          <Action />
        </Match>
      </Switch>
    </div>
  );
};

export default QueryBuilder;
