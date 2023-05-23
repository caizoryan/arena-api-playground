import { Component, For } from "solid-js";
import { nextState, query, Select } from "./QueryBuilder";
import { actions } from "../../../../Store/Data";

const Action: Component = () => {
  function handleClick(action: any) {
    if (action.options) {
      nextState("options", action.name);
      query.options = action.options;
    } else nextState("pagination", action.name);
  }
  return (
    <>
      <div>Choose an action</div>
      <div style={"display: flex; max-width: 70vw;flex-wrap: wrap"}>
        <For each={actions.avalilable()}>
          {(action) => (
            <Select
              name={action.name}
              desc={action.desc}
              select={() => handleClick(action)}
            ></Select>
          )}
        </For>
      </div>
    </>
  );
};

export default Action;
