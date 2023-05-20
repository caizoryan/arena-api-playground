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
      <div>
        Choose Endpoint, the are.na API has {endpoint.available().length}{" "}
        endpoints to choose from.<br></br>
        <span style="color: var(--color-3); font-size: 12px">
          PS. The documentation also mentions a "/channels" end point, however
          it always resulted in a 500 Internal server error for me so I haven't
          added it here.
        </span>
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
