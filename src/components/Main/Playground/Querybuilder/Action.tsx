import { Component, For } from "solid-js";
import { nextState, query, Select } from "./QueryBuilder";

const Action: Component = () => {
  const actions = {
    use: (action: string) => nextState("options", action),
    avalilable: () => {
      switch (query.endpoint) {
        case "channel":
          return [
            {
              name: "sort",
              desc: "Change the position a block or a channel in selected channel",
              auth: true,
              method: "PUT",
            },
            {
              name: "connect",
              desc: "Connect a block or a channel to the selected channel",
              auth: true,
              method: "POST",
            },
            {
              name: "disconnect",
              desc: "Disconnect and existing block or a channel in selected channel",
              auth: true,
              method: "POST",
            },
            {
              name: "contents",
              desc: "Returns the contents of the selected channel",
              auth: false,
              method: "GET",
            },
            {
              name: "connections",
              desc: "Returns all channels the selected channel appears in",
              auth: false,
              method: "GET",
            },
            {
              name: "create",
              desc: "Create a new channel",
              auth: true,
              method: "POST",
            },
            {
              name: "update",
              desc: "Update channel title and visibility",
              auth: true,
              method: "PUT",
            },
            {
              name: "createBlock",
              desc: "Create a block in the channel",
              auth: true,
              method: "POST",
            },
            {
              name: "get",
              desc: "Get all channel details",
              auth: false,
              method: "GET",
            },
            {
              name: "delete",
              desc: "Delete the channel",
              auth: true,
              method: "DELETE",
            },
            {
              name: "thumb",
              desc: "Get thumbnail details",
              auth: true,
              method: "GET",
            },
          ];
        case "block":
          return [
            {
              name: "channels",
              desc: "Get all the channels the block appears in",
              auth: false,
              method: "GET",
            },
            {
              name: "update",
              desc: "Update the tile, description and contents of the block",
              auth: true,
              method: "PUT",
            },
            {
              name: "get",
              desc: "Get block details",
              auth: false,
              method: "GET",
            },
            {
              name: "comments",
              desc: "Get comments on the block",
              auth: false,
              method: "GET",
            },
            {
              name: "addComment",
              desc: "Add a comment to selected block",
              auth: true,
              method: "POST",
            },
            {
              name: "deleteComment",
              desc: "Delete a comment on selected block",
              auth: true,
              method: "DELETE",
            },
            {
              name: "updateComment",
              desc: "Update comment on selected block",
              auth: true,
              method: "PUT",
            },
          ];
      }
    },
  };
  return (
    <>
      <div>Choose an action</div>
      <div style={"display: flex; max-width: 70vw;flex-wrap: wrap"}>
        <For each={actions.avalilable()}>
          {(action) => (
            <Select
              name={action.name}
              desc={action.desc}
              select={() => actions.use(action.name)}
            ></Select>
          )}
        </For>
      </div>
    </>
  );
};

export default Action;
