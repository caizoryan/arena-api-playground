import { Component, For } from "solid-js";
import { endpoint } from "../../../../Store/Data";
import Select from "../../../Babies/Select";

const Endpoint: Component = () => {
  return (
    <>
      <div>
        Choose Endpoint, the are.na API has {endpoint.available().length}{" "}
        endpoints to choose from.<br></br>
      </div>
      <div style={"display: flex; flex-wrap: wrap"}>
        <For each={endpoint.available()}>
          {(option) => (
            <Select
              name={option.name}
              desc={option.description}
              select={() => endpoint.use(option.name)}
            />
          )}
        </For>
      </div>
    </>
  );
};

export default Endpoint;
