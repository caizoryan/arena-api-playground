import { Component } from "solid-js";

const Space: Component<{ d: { w: string; h: string } }> = (props) => {
  return <div style={`width: ${props.d.w}; height: ${props.d.h}`}></div>;
};

export default Space;
