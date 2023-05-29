import { arena } from "./Main/Playground/Playground";
import { Component, createResource, For, Suspense } from "solid-js";
import Space from "./Space";
import "../styles/resources.css";

export const Resource: Component = () => {
  const [data] = createResource(getData);

  async function getData() {
    return await arena
      .channel("api-playground-resources")
      .contents({ direction: "asc" })
      .then((res) => structuredClone(res));
  }

  return (
    <>
      <h1 class="header">Resources</h1>

      <div class="resources-container">
        <Suspense>
          <For each={data()?.contents}>
            {(block) => {
              return (
                <>
                  <Space d={{ w: "0", h: "10px" }} />
                </>
              );
            }}
          </For>
          <For each={data()?.contents}>
            {(block) => {
              return (
                <>
                  {block.class === "Link" ? (
                    <div class="link">
                      <h2>{block.title}</h2>
                      <img src={block.image.display.url}></img>
                    </div>
                  ) : (
                    <></>
                  )}
                  <Space d={{ w: "0", h: "10px" }} />
                </>
              );
            }}
          </For>
        </Suspense>
      </div>
    </>
  );
};
