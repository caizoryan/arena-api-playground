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
              options: [
                {
                  name: "id",
                  desc: "The id of the block or channel to be disconnected",
                },
                {
                  name: "type",
                  desc: "select channel or block",
                  options: ["channel", "block"],
                },
              ],
            },
            {
              name: "disconnect",
              desc: "Disconnect and existing block or a channel in selected channel",
              auth: true,
              method: "POST",
              options: [
                {
                  name: "Id",
                  desc: "The id of the block or channel to be disconnected",
                },
                {
                  name: "type",
                  desc: "select channel or block",
                  options: ["channel", "block"],
                },
              ],
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
              options: [
                {
                  name: "title",
                  desc: "Title of the Channel",
                },
                {
                  name: "status",
                  desc: "Status of the channel, private, closed or open",
                  options: ["private", "open", "closed"],
                },
              ],
            },
            {
              name: "update",
              desc: "Update channel title and visibility",
              auth: true,
              method: "PUT",
              options: [
                {
                  name: "title",
                  desc: "Title of the Channel",
                },
                {
                  name: "status",
                  desc: "Status of the channel, private, closed or open",
                  options: ["private", "open", "closed"],
                },
              ],
            },
            {
              name: "createBlock",
              desc: "Create a block in the channel",
              auth: true,
              method: "POST",
              options: [
                {
                  name: "source",
                  desc: "Source of the block",
                },
                {
                  name: "content",
                  desc: "Content of the block",
                },
                {
                  name: "description",
                  desc: "Description of the block",
                },
              ],
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
              options: [
                {
                  name: "title",
                  desc: "Title of the block",
                },
                {
                  name: "description",
                  desc: "Description of the block",
                },
                {
                  name: "content",
                  desc: "Content of the block",
                },
              ],
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
              options: [
                {
                  name: "body",
                  desc: "Comment body",
                },
              ],
            },
            {
              name: "deleteComment",
              desc: "Delete a comment on selected block",
              auth: true,
              method: "DELETE",
              options: [
                {
                  name: "commentId",
                  desc: "Comment id to delete",
                },
              ],
            },
            {
              name: "updateComment",
              desc: "Update comment on selected block",
              auth: true,
              method: "PUT",
              options: [
                {
                  name: "commentId",
                  desc: "Comment id to update",
                },
                {
                  name: "body",
                  desc: "Updated comment",
                },
              ],
            },
          ];
      }
    },
  };

  function handleClick(action: any) {
    if (action.options) {
      nextState("options", action.name);
      query.options = action.options;
    } else nextState("pagination", action.name);
  }
  return (
    <>
      <div>Choose an action</div>
      <div style={"display: flex; max-width: 70vw;flex-wrap: wrap"}>
        <For each={actions.avalilable()}>
          {(action) => (
            <Select
              name={action.name}
              desc={action.desc}
              select={() => handleClick(action)}
            ></Select>
          )}
        </For>
      </div>
    </>
  );
};

export default Action;
