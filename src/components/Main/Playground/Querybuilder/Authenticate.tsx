import { Component, createSignal, Show } from "solid-js";
import {
  authenticated,
  query,
  setAuthenticated,
} from "../../../../Store/State";
import { arena } from "../Playground";
import { refreshQuery } from "./QueryDisplay";

const Authenticate: Component = () => {
  const [hide, setHide] = createSignal(false);
  const [err, setErr] = createSignal(false);
  function authenticate() {
    arena
      .me()
      .then((response) => {
        console.log(`Authenticated as ${response.username}`);
        setHide(true);
        setAuthenticated({ auth: true, user: response.username });
      })
      .catch(() => {
        setErr(true);
        console.log("Authentication Key is invalid, try again");
      });
  }
  return (
    <>
      <Show when={hide()}>Authenticated as {authenticated().user}</Show>
      <Show when={!hide()}>
        <div>
          <p>
            Enter your token, find it{" "}
            <a href="https://arena-token-gen.vercel.app/" target="_blank">
              here
            </a>
          </p>
          <Show when={err()}>
            <p>Authentication Key is invalid, try again</p>
          </Show>
          <input
            style="width: 300px"
            onInput={(e) => {
              query.token = e.currentTarget.value;
              arena.setToken(e.currentTarget.value);
              refreshQuery();
            }}
          ></input>
          <button
            onClick={() => {
              authenticate();
              // setHide(true);
            }}
          >
            Authenticate
          </button>
        </div>
      </Show>
    </>
  );
};

export default Authenticate;
