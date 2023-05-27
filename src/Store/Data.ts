import { query, nextState } from "./State";
import { arena } from "../components/Main/Playground/Playground";

const domain = "https://api.are.na/v2/";

export const endpoint = {
  use: (endpoint: string) => {
    if (endpoint === "me") {
      query.method = "GET";
      nextState("pagination", endpoint);
    } else if (endpoint === "search") nextState("action", endpoint);
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
        name: "search",
        description: "Search for blocks, users or channels",
        auth: false,
      },
      {
        name: "users",
        description: "Access user details based on user id",
        auth: false,
      },
      {
        name: "blocks",
        description: "Access block based on block id",
        auth: false,
      },
      {
        name: "groups",
        description: "Acess group details based on group slug",
        auth: false,
      },
      {
        name: "channels",
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
      case "channels":
        return {
          type: "text",
          search: arena.search.channels,
          end: "channels",
          noun: "slug",
        };
      case "blocks":
        return {
          type: "number",
          search: arena.search.blocks,
          end: "blocks",
          noun: "id",
        };
      case "users":
        return {
          type: "number",
          search: arena.search.users,
          end: "users",
          noun: "id",
        };
      case "groups":
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
  use: (action: any) => {
    query.method = action.method;
    if (action.options) {
      nextState("options", action.name);
      query.options = action.options;
    } else if (action.method != "GET") nextState("end", action.name);
    else nextState("pagination", action.name);
  },
  avalilable: (): any[] => {
    switch (query.endpoint) {
      case "channels":
        return [
          {
            name: "sort",
            desc: "Change the position a block or a channel in selected channel",
            auth: true,
            method: "PUT",
            url: () => {
              return domain + query.endpoint + "/" + query.slug + "/" + "sort";
            },
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
            url: () => {
              return (
                domain + query.endpoint + "/" + query.slug + "/" + "connections"
              );
            },
            options: [
              {
                name: "connectable_id",
                desc: "The id of the block or channel to be connected",
                type: "number",
                value: "",
              },
              {
                name: "connectable_type",
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
            url: () => {
              if (
                query.options.find((option) => option.name === "type")
                  ?.value === "block"
              )
                return (
                  domain +
                  query.endpoint +
                  "/" +
                  query.slug +
                  "/" +
                  "blocks" +
                  "/" +
                  query.options.find((option) => option.name === "id")?.value
                );
              else if (
                query.options.find((option) => option.name === "type")
                  ?.value === "connectionId"
              )
                return (
                  domain +
                  "connections" +
                  "/" +
                  query.options.find((option) => option.name === "id")?.value
                );
              else return "";
            },
            options: [
              {
                name: "id",
                desc: "The id of the block or the id of the connection",
                type: "number",
                value: "",
              },
              {
                name: "type",
                desc: "id of the block or connection?",
                options: ["block", "connectionId"],
                value: "",
              },
            ],
          },
          {
            name: "contents",
            desc: "Returns the contents of the selected channel",
            auth: false,
            method: "GET",
            url: () => {
              return (
                domain + query.endpoint + "/" + query.slug + "/" + "contents"
              );
            },
          },
          {
            name: "connections",
            desc: "Returns all channels the selected channel appears in",
            auth: false,
            method: "GET",
            url: () => {
              return (
                domain + query.endpoint + "/" + query.slug + "/" + "connections"
              );
            },
          },
          {
            name: "create",
            desc: "Create a new channel",
            auth: true,
            method: "POST",
            url: () => {
              return domain + query.endpoint;
            },
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
                options: ["private", "public", "closed"],
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
            url: () => {
              return domain + query.endpoint + "/" + query.slug;
            },
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
                options: ["private", "public", "closed"],
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
            url: () => {
              return (
                domain + query.endpoint + "/" + query.slug + "/" + "blocks"
              );
            },
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
            url: () => {
              return domain + query.endpoint + "/" + query.slug;
            },
          },
          {
            name: "delete",
            desc: "Delete the channel",
            auth: true,
            method: "DELETE",
            url: () => {
              return domain + query.endpoint + "/" + query.slug;
            },
          },
          {
            name: "thumb",
            desc: "Get thumbnail details",
            auth: true,
            method: "GET",
            url: () => {
              return domain + query.endpoint + "/" + query.slug + "/" + "thumb";
            },
          },
        ];
      case "blocks":
        return [
          {
            name: "channels",
            desc: "Get all the channels the block appears in",
            auth: false,
            method: "GET",
            url: () => {
              return (
                domain + query.endpoint + "/" + query.slug + "/" + "channels"
              );
            },
          },
          {
            name: "update",
            desc: "Update the tile, description and contents of the block",
            auth: true,
            method: "PUT",
            url: () => {
              return domain + query.endpoint + "/" + query.slug;
            },
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
            url: () => {
              return domain + query.endpoint + "/" + query.slug;
            },
          },
          {
            name: "comments",
            desc: "Get comments on the block",
            auth: false,
            method: "GET",
            url: () => {
              return (
                domain + query.endpoint + "/" + query.slug + "/" + "comments"
              );
            },
          },
          {
            name: "addComment",
            desc: "Add a comment to selected block",
            auth: true,
            method: "POST",
            url: () => {
              return (
                domain + query.endpoint + "/" + query.slug + "/" + "comments"
              );
            },
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
            url: () => {
              return (
                domain +
                query.endpoint +
                "/" +
                query.slug +
                "/" +
                "comments" +
                "/" +
                query.options.find((option) => option.name === "comment_id")
                  ?.value
              );
            },
            options: [
              {
                name: "comment_id",
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
            url: () => {
              return (
                domain +
                query.endpoint +
                "/" +
                query.slug +
                "/" +
                "comments" +
                "/" +
                query.options.find((option) => option.name === "comment_id")
                  ?.value
              );
            },
            options: [
              {
                name: "comment_id",
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
      case "users":
        return [
          {
            name: "get",
            desc: "Get user details",
            auth: false,
            method: "GET",
            url: () => {
              return domain + query.endpoint + "/" + query.slug;
            },
          },
          {
            name: "channels",
            desc: "Get the user's channels",
            auth: false,
            method: "GET",
            url: () => {
              return (
                domain + query.endpoint + "/" + query.slug + "/" + "channels"
              );
            },
          },
          {
            name: "following",
            desc: "Get the user's following",
            auth: false,
            method: "GET",
            url: () => {
              return (
                domain + query.endpoint + "/" + query.slug + "/" + "following"
              );
            },
          },
          {
            name: "followers",
            desc: "Get the user's followers",
            auth: false,
            method: "GET",
            url: () => {
              return (
                domain + query.endpoint + "/" + query.slug + "/" + "followers"
              );
            },
          },
        ];
      case "search":
        return [
          {
            name: "everything",
            desc: "Search for all blocks, channels or users",
            method: "GET",
            url: () => {
              return (
                domain +
                query.endpoint +
                "/" +
                `?q=${
                  query.options.find((option) => option.name === "query")?.value
                }`
              );
            },
            options: [
              {
                name: "query",
                desc: "What you want to search for",
                type: "text",
                value: "",
              },
            ],
          },
          {
            name: "channels",
            desc: "Search for only channels",
            method: "GET",
            url: () => {
              return (
                domain +
                query.endpoint +
                "/" +
                "channels" +
                "/" +
                `?q=${
                  query.options.find((option) => option.name === "query")?.value
                }`
              );
            },
            options: [
              {
                name: "query",
                desc: "What you want to search for",
                type: "text",
                value: "",
              },
            ],
          },
          // TODO check for undefined in search term
          {
            name: "blocks",
            desc: "Search for only blocks",
            method: "GET",
            url: () => {
              return (
                domain +
                query.endpoint +
                "/" +
                "blocks" +
                "/" +
                `?q=${
                  query.options.find((option) => option.name === "query")?.value
                }`
              );
            },
            options: [
              {
                name: "query",
                desc: "What you want to search for",
                type: "text",
                value: "",
              },
            ],
          },
          {
            name: "users",
            desc: "Search for only users",
            method: "GET",
            url: () => {
              return (
                domain +
                query.endpoint +
                "/" +
                "users" +
                "/" +
                `?q=${
                  query.options.find((option) => option.name === "query")?.value
                }`
              );
            },
            options: [
              {
                name: "query",
                desc: "What you want to search for",
                type: "text",
                value: "",
              },
            ],
          },
        ];
      case "groups":
        return [
          {
            name: "get",
            desc: "Get group details",
            method: "GET",
            url: () => {
              return domain + query.endpoint + "/" + query.slug;
            },
          },
          {
            name: "channels",
            desc: "Get all channels in the group",
            method: "GET",
            url: () => {
              return (
                domain + query.endpoint + "/" + query.slug + "/" + "channels"
              );
            },
          },
        ];
      default:
        return [
          {
            name: "get",
            desc: "Get details",
            method: "GET",
            url: () => {
              return domain + query.endpoint;
            },
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
    desc: "The page to fetch.",
    type: "number",
  },
  {
    name: "forceRefresh",
    value: "no",
    options: ["yes", "no"],
    desc: "Force refresh of the server cache. ",
  },
];
