import { Component, For } from "solid-js";
import { query, Select, setState } from "./QueryBuilder";

const Action: Component = () => {
  const actions = {
    use: (action: string) => {
      query.action = action;
      setState("options");
    },
    avalilable: () => {
      switch (query.endpoint) {
        case "channel":
          return [
            { name: "sort", desc: "" },
            { name: "connect", desc: "" },
            { name: "disconnect", desc: "" },
            { name: "contents", desc: "" },
            { name: "connections", desc: "" },
            { name: "create", desc: "" },
            { name: "update", desc: "" },
            { name: "createBlock", desc: "" },
            { name: "get", desc: "" },
            { name: "delete", desc: "" },
            { name: "thumb", desc: "" },
          ];
        case "block":
          return [{ name: "monkey", desc: "" }];
      }
    },
  };
  return (
    <>
      <div>Choose an action</div>
      <div style={"display: flex; max-width: 70vw;flex-wrap: wrap"}>
        <For each={actions.avalilable()}>
          {(action) => (
            <Select
              name={action.name}
              desc={action.desc}
              select={() => actions.use(action.name)}
            ></Select>
          )}
        </For>
      </div>
    </>
  );
};

export default Action;
