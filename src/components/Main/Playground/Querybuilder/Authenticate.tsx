import { Component, createSignal, Show } from "solid-js";
import {
  authenticated,
  query,
  setAuthenticated,
} from "../../../../Store/State";
import { arena } from "../Playground";
import { refreshQuery } from "./QueryDisplay";
import "../../../../styles/authenticate.css";

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
    <div class="authenticate-container">
      <Show when={authenticated().auth}>
        <span class="auth">Authenticated as {authenticated().user}</span>
      </Show>
      <Show when={!authenticated().auth}>
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
      </Show>
      <h2 class="notes-title">Notes</h2>
      <ul class="notes-list">
        <li>
          The playground can be used without authentication, this is optional.
        </li>
        <li>
          Your token is stored nowhere, if you refresh the page the token will
          be deleted.
        </li>
        <li>
          If you add your token, the POST, PUT and DELETE requests can make
          changes to your Are.na account.
        </li>
        <li>I recommend making a free testing account for this use case.</li>
      </ul>
    </div>
  );
};

export default Authenticate;
