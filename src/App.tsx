// <!--
//   /~\
// C oo
// _( ^)
// /   ~\
// -aaryan -->
// a-p.space
//
// <!-- Hello to whoever is browsing this code -->
// <!-- Appreciate any feedback, have a look around and have fun! -->

import type { Component } from "solid-js";
import "./styles/Global.css";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main/Main";

const App: Component = () => {
  return (
    <div class="sabka-baap">
      <div class="block-mobile">
        Sorry, This window size is currently not supported. If you still wanna
        see how messed up a site designed for Desktop looks at smaller screen
        sizes click{" "}
        <span onClick={() => document.querySelector(".block-mobile")?.remove()}>
          here
        </span>
        .
      </div>
      <Sidebar />
      <Main />
    </div>
  );
};

export default App;

// <!--
// ....................................................
// ....................................................
// ........................./\.........................
// ..................______/__\_______.................
// ..................||-------------||.................
// ..................||             ||.................
// ..................||    \|||/    ||.................
// ..................||   [ @-@ ]   ||.................
// ..................||    ( ' )    ||.......       ...
// ..................||    _(O)_    ||.......|EXIT |...
// ..................||   / >=< \   ||.......|==>> |...
// ..................||__/_|_:_|_\__||.................
// ..................-----------------.................
// ....................................................
// ....................................................
// Monkey with a bowtie in the museum-->
