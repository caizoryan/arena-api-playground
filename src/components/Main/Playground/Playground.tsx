import { Component } from "solid-js";
import "../../../styles/playground.css";
import QueryBuilder from "./QueryBuilder";
import ResponsePainter from "./ResponsePainter";

const Playground: Component = () => {
  return (
    <div class="playground-container">
      <QueryBuilder />
      <ResponsePainter />
    </div>
  );
};

export default Playground;
