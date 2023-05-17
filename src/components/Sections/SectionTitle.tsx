import { Component } from "solid-js";
import "../../styles/sectionTitle.css";
import { selected, setSelected } from "../../Store/Store";

const SectionTitle: Component<{
  title: string;
}> = (props) => {
  return (
    <h3
      onClick={() => setSelected(props.title)}
      classList={{ active: props.title === selected() }}
    >
      {props.title}
    </h3>
  );
};

export default SectionTitle;
