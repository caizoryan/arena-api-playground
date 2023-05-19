import { Component, For } from "solid-js";
import { Select, nextState } from "./QueryBuilder";

const Endpoint: Component = () => {
  const endpoint = {
    use: (endpoint: string) => {
      if (endpoint === "channels" || endpoint === "me")
        nextState("end", endpoint);
      else nextState("slug", endpoint);
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

  return (
    <>
      <div>Choose Endpoint, the are.na API has 6 endpoints to choose from</div>
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
