import { Component } from "solid-js";
import "../../../styles/playground.css";
import QueryBuilder from "../Playground/Querybuilder/QueryBuilder";
import ResponsePainter from "./ResponsePainter";
import { ArenaClient } from "../../../Arena/arenaService";

export const arena = new ArenaClient();

const Playground: Component = () => {
  return (
    <div class="playground-container">
      <QueryBuilder />
      <ResponsePainter />
    </div>
  );
};

export default Playground;
