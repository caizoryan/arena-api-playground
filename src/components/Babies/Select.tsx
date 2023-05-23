import { Component, createSignal } from "solid-js";

const Select: Component<{
  name: string;
  desc: string;
  select: (select: string) => void;
}> = (props) => {
  const [hover, setHover] = createSignal(false);
  return (
    <div
      class="select"
      onMouseLeave={() => {
        setHover(false);
      }}
      onMouseEnter={() => {
        setHover(true);
      }}
      onClick={() => {
        props.select(props.name);
      }}
    >
      <div class="select-name">{props.name}</div>
      <div classList={{ "select-description": true, show: hover() }}>
        {props.desc}
      </div>
    </div>
  );
};

export default Select;
