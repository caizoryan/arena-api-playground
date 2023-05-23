import { Component, createSignal, For, Match, Show, Switch } from "solid-js";
import { nextState, query } from "./QueryBuilder";
import "../../../../styles/playground.css";

// Build from query.options
// ------------------------

export const OptionBlock: Component<{
  name: string;
  desc: string;
  select: (value: string) => void;
  options?: string[];
  value: string | number;
  type?: string;
}> = (props) => {
  return (
    <>
      <div class="select">
        <div class="select-name">{props.name}</div>
        <div classList={{ "select-description": true, show: true }}>
          {props.desc}
        </div>
        <Switch>
          <Match when={props.options}>
            {props.options ? (
              <DropDown
                options={props.options}
                select={props.select}
              ></DropDown>
            ) : null}
          </Match>
          <Match when={!props.options}>
            <input
              type={props.type}
              value={props.value}
              onInput={(e) => props.select(e.currentTarget.value)}
            ></input>
          </Match>
        </Switch>
      </div>
    </>
  );
};

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

const Options: Component = () => {
  return (
    <>
      <div>Options</div>
      <div class="options-container">
        <For each={query.options}>
          {(option, index) => (
            <OptionBlock
              name={option.name}
              value={option.value}
              type={option.type ? option.type : undefined}
              desc={option.desc}
              options={option.options ? option.options : undefined}
              select={(value) => (query.options[index()]["value"] = value)}
            ></OptionBlock>
          )}
        </For>
      </div>

      <button
        onClick={() => {
          nextState("pagination", "");
        }}
      >
        Next
      </button>
    </>
  );
};

export default Options;
