import { Component, For } from "solid-js";
import "../../../styles/playground.css";
import { ArenaClient } from "../../../Arena/arenaService";

const arena = new ArenaClient();
const domain = "https://api.are.na/v2/";
const endpointOptions = [
  "me/",
  "user/",
  "block/",
  "group/",
  "channel/",
  "search/",
];

// Set and save token for authentication
// Select What first (channel/block/etc)
// Select slug if applicable
// Select what to do with it
// Select pagination option
//
// See results

const QueryBuilder: Component = () => {
  return (
    <div>
      <h1>Query Builder</h1>
      <div class="query">
        <div class="domain">{domain}</div>
        <select class="endpoint">
          <For each={endpointOptions}>
            {(option) => <option value={option}>{option}</option>}
          </For>
        </select>
      </div>
    </div>
  );
};

export default QueryBuilder;
