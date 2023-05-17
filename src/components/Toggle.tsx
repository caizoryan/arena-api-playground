import type { Component, Accessor, Setter } from "solid-js";

const Toggle: Component<{
  hide: Accessor<boolean>;
  setHide: Setter<boolean>;
}> = (props) => {
  return (
    <div
      onClick={() => {
        props.setHide(!props.hide());
      }}
      classList={{ "hide-button": true, "show-button": props.hide() }}
    >
      {props.hide() ? "→" : "←"}
    </div>
  );
};

export default Toggle;
