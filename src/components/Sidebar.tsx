import { Component, createSignal, For, Show } from "solid-js";
import Logo from "./Logo";
import "../styles/sidebar.css";
import Space from "./Space";
import Sections from "./Sections/Sections";
import Toggle from "./Toggle";
import { BiSolidHeart } from "solid-icons/bi";
import { authenticated } from "../Store/State";

// ----------------------------
// How to make a website using are.na in plain js
// How to make a website using are.na in jquery
// How to make a website using are.na in svelte
// How to make a website using are.na in solid-js
// How to make a website using are.na in vue

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
        <p>
          Made with <BiSolidHeart /> in Solid JS
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
