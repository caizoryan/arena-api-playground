import type { Component } from "solid-js";
import "./styles/Global.css";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main/Main";

// Unofficial Are.na Documentation
// ----------------------------
// How to make a website using are.na in plain js
// How to make a website using are.na in jquery
// How to make a website using are.na in svelte
// How to make a website using are.na in solid-js
// How to make a website using are.na in vue
// -----------------------------
// x x x x x x x x x x x x x x x
// -----------------------------
// To change css variables:
//
// var r = document.querySelector(":root");
// r?.style.setProperty("--primary-color", "pink");
// -----------------------------

const App: Component = () => {
  return (
    <div class="sabka-baap">
      <Sidebar />
      <Main />
    </div>
  );
};

export default App;
