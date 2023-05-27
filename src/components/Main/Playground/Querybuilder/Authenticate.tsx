import { Component, createSignal, Show } from "solid-js";
import { query } from "../../../../Store/State";
import { arena } from "../Playground";
import { refreshQuery } from "./QueryDisplay";

const Authenticate: Component = () => {
  const [hide, setHide] = createSignal(false);
  return (
    <Show when={!hide()}>
      <div>
        <p>
          Enter your token, find it{" "}
          <a href="https://arena-token-gen.vercel.app/" target="_blank">
            here
          </a>
        </p>
        <input
          style="width: 300px"
          onInput={(e) => {
            query.token = e.currentTarget.value;
            arena.setToken(e.currentTarget.value);
            refreshQuery();
          }}
        ></input>
        <button onClick={() => setHide(true)}>Hide</button>
      </div>
    </Show>
  );
};

export default Authenticate;
