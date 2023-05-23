import { Component, For } from "solid-js";
import { query, nextState } from "../../../../Store/State";
import "../../../../styles/playground.css";
import { OptionBlock } from "../../../Babies/OptionBlock";

const Options: Component = () => {
  return (
    <>
      <div>Options</div>
      <div class="options-container">
        <For each={query.options}>
          {(option, index) => (
            <OptionBlock
              name={option.name}
              value={option.value}
              type={option.type ? option.type : undefined}
              desc={option.desc}
              options={option.options ? option.options : undefined}
              select={(value) => (query.options[index()]["value"] = value)}
            ></OptionBlock>
          )}
        </For>
      </div>

      <button
        onClick={() => {
          nextState("pagination", "");
        }}
      >
        Next
      </button>
    </>
  );
};

export default Options;
