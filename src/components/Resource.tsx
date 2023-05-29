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
      <div class="resources-container">
        <Suspense>
          <h1>Channels</h1>
          <div class="block-container">
            <For each={data()?.contents}>
              {(block) => {
                return (
                  <>
                    {block.class === "Channel" ? (
                      <a href={`https://are.na/channel/${block.slug}`}>
                        <div class="channel">
                          <h2>{block.title}</h2>
                        </div>
                      </a>
                    ) : (
                      <></>
                    )}
                    <Space d={{ w: "0", h: "10px" }} />
                  </>
                );
              }}
            </For>
          </div>
          <h1>Links</h1>
          <div class="block-container">
            <For each={data()?.contents}>
              {(block) => {
                return (
                  <>
                    {block.class === "Link" ? (
                      <a href={block.source.url}>
                        <div class="link">
                          <h2>{block.title}</h2>
                          <img src={block.image.display.url}></img>
                        </div>
                      </a>
                    ) : (
                      <></>
                    )}
                    <Space d={{ w: "0", h: "10px" }} />
                  </>
                );
              }}
            </For>
          </div>
        </Suspense>
        <a href="https://are.na/channel/api-playground-resources">
          <p>Add to this channel</p>
        </a>
      </div>
    </>
  );
};
