import { Component, For, onMount } from "solid-js";
import { pagination } from "../../../../Store/Data";
import { nextState, query } from "../../../../Store/State";
import "../../../../styles/playground.css";
import { OptionBlock } from "../../../Babies/OptionBlock";

const Pagination: Component = () => {
  onMount(() => {
    query.pagination = structuredClone(pagination);
  });
  return (
    <>
      <div>Pagination</div>
      <div class="options-container">
        <For each={query.pagination}>
          {(options) => (
            <OptionBlock
              name={options.name}
              desc={options.desc}
              value={options.value}
              options={options.options}
              type={options.type ? options.type : undefined}
              select={(select: string) => (options.value = select)}
            ></OptionBlock>
          )}
        </For>
      </div>
      <button
        onClick={() => {
          console.log(query.method);
          nextState("end", "");
        }}
      >
        Next
      </button>
    </>
  );
};

export default Pagination;
