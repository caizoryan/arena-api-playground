import { Component, createResource, For, Suspense } from "solid-js";
import { arena } from "./Main/Playground/Playground";
import Space from "./Space";
import "../styles/about.css";

export const About: Component = () => {
  const [data] = createResource(getData);

  async function getData() {
    return await arena
      .channel("api-playground-about")
      .contents({ direction: "asc" })
      .then((res) => structuredClone(res));
  }

  return (
    <div class="about-container">
      <h1 class="header">About</h1>
      <Suspense>
        <For each={data()?.contents}>
          {(block) => {
            return (
              <>
                <h2>{block.title}</h2>
                {block.content.substring(0, 3) === "###" ? (
                  <h4>{block.content.substring(3)}</h4>
                ) : (
                  <p>{block.content}</p>
                )}
                <Space d={{ w: "0", h: "10px" }} />
              </>
            );
          }}
        </For>
      </Suspense>
    </div>
  );
};
