import { Component, createSignal, For, Show } from "solid-js";
import Logo from "./Logo";
import "../styles/sidebar.css";
import Space from "./Space";
import Sections from "./Sections/Sections";
import Toggle from "./Toggle";

// ----------------------------
// How to make a website using are.na in plain js
// How to make a website using are.na in jquery
// How to make a website using are.na in svelte
// How to make a website using are.na in solid-js
// How to make a website using are.na in vue
//

const Sidebar: Component = () => {
  return (
    <div class="sidebar-container">
      <Logo />
      <h2>Unofficial Are.na Documentation</h2>
      <Space d={{ w: "0", h: "20px" }} />
      <p class="intro-text">
        Just a quick website trying to collect resources for using the are.na
        API. I started experimenting with the api when I was still learning to
        code and it took me a lot of trial and error to figure out how to work
        with API's since I hadn't used any before. After I figured it out I
        started finding all these great resources, so here is a quick collection
        either scavenged or written by yours truly. Happy coding!
      </p>
      <Sections />
    </div>
  );
};

export default Sidebar;
