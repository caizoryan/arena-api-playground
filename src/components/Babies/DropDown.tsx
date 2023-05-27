import { Component, createSignal, Show, For } from "solid-js";
import { refreshQuery } from "../Main/Playground/Querybuilder/QueryDisplay";

export const DropDown: Component<{
  options: string[];
  select: (option: string) => void;
}> = (props) => {
  const [show, setShow] = createSignal(false);
  const [selected, setSelected] = createSignal("Choose");
  return (
    <div style="display: flex; flex-direction: column;">
      <p
        style={
          selected() != "Choose"
            ? "color: var(--color-2)"
            : "color: var(--color-3)"
        }
        class="drop-down"
        onClick={() => setShow(!show())}
      >
        {selected()}
      </p>
      <Show when={show()}>
        <For each={props.options}>
          {(option) => (
            <p
              class="drop-down-child"
              onClick={() => {
                setSelected(option);
                setShow(false);
                props.select(selected());
                refreshQuery();
              }}
            >
              {option}
            </p>
          )}
        </For>
      </Show>
    </div>
  );
};
