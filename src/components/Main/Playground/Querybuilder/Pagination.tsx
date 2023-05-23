import { Component, For } from "solid-js";
import { pagination } from "../../../../Store/Data";

const Pagination: Component = () => {
  return (
    <>
      <div>Pagination</div>
      <For each={pagination}>
        {(options) => {
          if (options.options) {
            return <p>{options.name}</p>;
          } else {
            return (
              <p>
                {options.name} :{" "}
                <input
                  value={options.value}
                  onInput={(e) => (options.value = e.currentTarget.value)}
                ></input>
              </p>
            );
          }
        }}
      </For>
    </>
  );
};

export default Pagination;
