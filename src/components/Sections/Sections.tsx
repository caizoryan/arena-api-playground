import { Component, For } from "solid-js";
import { createMutable } from "solid-js/store";
import SectionTitle from "./SectionTitle";

const Sections: Component = () => {
  const sections = createMutable([
    "API V2 / Playground",
    "API V2 / Reference",
    "Example / Vanilla",
    "Example / JQuery",
    "Example / Svelte",
    "Example / Solid JS",
    "Example / Vue",
  ]);

  return <For each={sections}>{(title) => <SectionTitle title={title} />}</For>;
};

export default Sections;
