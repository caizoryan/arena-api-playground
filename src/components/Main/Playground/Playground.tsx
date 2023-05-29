import { Component } from "solid-js";
import "../../../styles/playground.css";
import Builder from "../Playground/Querybuilder/Builder";
import ResponsePainter from "./ResponsePainter";
import { ArenaClient } from "../../../arena-ts/arenaService";

export const arena = new ArenaClient();

const Playground: Component = () => {
  return (
    <div class="playground-container">
      <Builder />
      <ResponsePainter />
    </div>
  );
};

export default Playground;
