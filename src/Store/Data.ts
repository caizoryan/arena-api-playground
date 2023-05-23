import {
  nextState,
  query,
} from "../components/Main/Playground/Querybuilder/QueryBuilder";

import { arena } from "../components/Main/Playground/Playground";

export const endpoint = {
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

export const slug = {
  use: (slug: string) => nextState("action", slug),
  available: () => {
    switch (query.endpoint) {
      case "channel":
        return {
          type: "text",
          search: arena.search.channels,
          end: "channels",
          noun: "slug",
        };
      case "block":
        return {
          type: "number",
          search: arena.search.blocks,
          end: "blocks",
          noun: "id",
        };
      case "user":
        return {
          type: "number",
          search: arena.search.users,
          end: "users",
          noun: "id",
        };
      case "group":
        return {
          type: "text",
          search: arena.search.channels,
          end: "users",
          noun: "slug",
        };
      default:
        return {
          type: "text",
          search: arena.search.channels,
          end: "channels",
          noun: "slug",
        };
    }
  },
};

export const actions = {
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
            options: [
              {
                name: "id",
                desc: "The id of the block or channel to be disconnected",
                type: "number",
                value: "",
              },
              {
                name: "position",
                desc: "New position of the block or a channel in selected channel",
                type: "number",
                value: "",
              },
              {
                name: "type",
                desc: "select channel or block",
                options: ["channel", "block"],
                value: "",
              },
            ],
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
                type: "number",
                value: "",
              },
              {
                name: "type",
                desc: "select channel or block",
                options: ["channel", "block"],
                value: "",
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
                name: "id",
                desc: "The id of the block or channel to be disconnected",
                type: "number",
                value: "",
              },
              {
                name: "type",
                desc: "select channel or block",
                options: ["channel", "block"],
                value: "",
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
                type: "text",
                value: "",
              },
              {
                name: "status",
                desc: "Status of the channel, private, closed or open",
                options: ["private", "open", "closed"],
                type: "text",
                value: "",
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
                type: "text",
                value: "",
              },
              {
                name: "status",
                desc: "Status of the channel, private, closed or open",
                options: ["private", "open", "closed"],
                type: "text",
                value: "",
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
                type: "text",
                value: "",
              },
              {
                name: "content",
                desc: "Content of the block",
                type: "text",
                value: "",
              },
              {
                name: "description",
                desc: "Description of the block",
                type: "text",
                value: "",
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
                type: "text",
                value: "",
              },
              {
                name: "description",
                desc: "Description of the block",
                type: "text",
                value: "",
              },
              {
                name: "content",
                desc: "Content of the block",
                type: "text",
                value: "",
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
                type: "text",
                value: "",
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
                type: "number",
                value: "",
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
                type: "number",
                value: "",
              },
              {
                name: "body",
                desc: "Updated comment",
                type: "text",
                value: "",
              },
            ],
          },
        ];
      case "user":
        return [
          { name: "get", desc: "Get user details", auth: false, method: "GET" },
          {
            name: "channel",
            desc: "Get the user's channel",
            auth: false,
            method: "GET",
          },
          {
            name: "following",
            desc: "Get the user's following",
            auth: false,
            method: "GET",
          },
          {
            name: "followers",
            desc: "Get the user's followers",
            auth: false,
            method: "GET",
          },
        ];
    }
  },
};

export const pagination = [
  {
    name: "sort",
    value: "position",
    desc: "The field to sort results by.",
    type: "text",
  },
  {
    name: "direction",
    value: "desc",
    options: ["asc", "desc"],
    desc: "The direction of returned results.",
    type: "text",
  },
  {
    name: "per",
    value: 50,
    desc: "Number of items returned per page. Maximum of 100.",
    type: "number",
  },
  {
    name: "page",
    value: 0,
    desc: "The page to fetch. Based on the per attribute. If per is set to 50, page 2 will return blocks 50-100",
    type: "number",
  },
  {
    name: "forceRefresh",
    value: "no",
    options: ["yes", "no"],
    desc: "Force refresh of the server cache. ",
  },
];
