import { Component, For } from "solid-js";
import { pagination } from "../../../../Store/Data";
import "../../../../styles/playground.css";
import { OptionBlock } from "../../../Babies/OptionBlock";

const Pagination: Component = () => {
  return (
    <>
      <div>Pagination</div>
      <div class="options-container">
        <For each={pagination}>
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
    </>
  );
};

export default Pagination;
