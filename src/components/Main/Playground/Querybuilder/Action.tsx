import { Component, For } from "solid-js";
import Select from "../../../Babies/Select";
import { actions } from "../../../../Store/Data";

const Action: Component = () => {
  return (
    <>
      <div>Choose an action</div>
      <div style={"display: flex; max-width: 70vw;flex-wrap: wrap"}>
        <For each={actions.avalilable()}>
          {(action) => (
            <Select
              name={action.name}
              desc={action.desc}
              select={() => actions.use(action)}
            ></Select>
          )}
        </For>
      </div>
    </>
  );
};

export default Action;
