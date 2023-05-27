import { Component, For } from "solid-js";
import { createMutable } from "solid-js/store";
import SectionTitle from "./SectionTitle";

const Sections: Component = () => {
  const sections = createMutable(["API V2 / Playground", "Resources", "About"]);
  return <For each={sections}>{(title) => <SectionTitle title={title} />}</For>;
};

export default Sections;
