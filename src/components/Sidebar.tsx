import { Component, createSignal, Show } from "solid-js";
import Logo from "./Logo";
import "../styles/sidebar.css";
import Space from "./Space";
import Sections from "./Sections/Sections";
import { BiSolidHeart } from "solid-icons/bi";
import { authenticated } from "../Store/State";

// :)
const messages = [
  "Really!?",
  "Better luck next time!",
  "Sorry no",
  "Fr?",
  "That's funny",
  "LMAO Sure",
  "Pay money to unlock",
  "Disagreed",
  "Make opioniated software",
];

const [text, setText] = createSignal("Enable Light Mode");
let timeout: any;

function enableLightModeLOL() {
  timeout ? clearTimeout(timeout) : null;
  let text = messages[Math.round(Math.random() * (messages.length - 1))];
  setText(text);
  timeout = setTimeout(() => {
    setText("Enable Light Mode");
    clearTimeout(timeout);
  }, 2000);
}

// TODO Don't ship a 6mb npm package for a simple heart icon
const Sidebar: Component = () => {
  return (
    <div class="sidebar-container">
      <Logo />
      <h4 style="color: rgba(100, 100, 100)">Unofficial </h4>
      <h2>Are.na API Playground</h2>
      <Space d={{ w: "0", h: "20px" }} />
      <p class="intro-text"></p>
      <Sections />
      <div class="bottom">
        <Show when={authenticated().auth == true}>
          <p> Authenticated as {authenticated().user}</p>
        </Show>
        <button
          onClick={enableLightModeLOL}
          style="margin-left: -7px; padding: 10px;"
        >
          {text()}
        </button>
        <p>
          Made with <BiSolidHeart /> in Solid JS
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
