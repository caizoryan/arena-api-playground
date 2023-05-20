import { Component, For } from "solid-js";

const Pagination: Component = () => {
  const defaultPagination = [
    { name: "sort", value: "position" },
    { name: "direction", value: "desc" },
    { name: "per", value: 50 },
    { name: "page", value: 0 },
    { name: "forceRefresh", value: "no" },
  ];

  return (
    <>
      <div>Pagination</div>
      <For each={defaultPagination}>
        {(options) => (
          <p>
            {options.name} : {options.value}
          </p>
        )}
      </For>
    </>
  );
};

export default Pagination;
