import { Component, For } from "solid-js";
import { query, setState, Select } from "./QueryBuilder";

const Endpoint: Component = () => {
  const endpoint = {
    use: (endpoint: string) => {
      query.endpoint = endpoint;
      if (endpoint === "channels" || endpoint === "me") setState("action");
      else setState("slug");
    },
    available: () => {
      return [
        {
          name: "channels",
          desc: "Get channels of authenticated user",
          auth: true,
        },
        {
          name: "me",
          desc: "Get authenticated user details",
          auth: true,
        },
        {
          name: "user",
          desc: "Access user details based on user id",
          auth: false,
        },
        {
          name: "block",
          desc: "Access block based on block id",
          auth: false,
        },
        {
          name: "group",
          desc: "Acess group details based on group slug",
          auth: false,
        },
        {
          name: "channel",
          desc: "Access channels using a channel slug",
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
              desc={option.desc}
              select={endpoint.use}
            />
          )}
        </For>
      </div>
    </>
  );
};

export default Endpoint;
