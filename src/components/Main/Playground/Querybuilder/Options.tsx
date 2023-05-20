import { Component, createSignal, For, Match, Show, Switch } from "solid-js";
import { nextState, query, Select } from "./QueryBuilder";

// Build from query.options
//
const OptionBlock: Component<{
  name: string;
  desc: string;
  select: (value: string) => void;
  options?: string[];
}> = (props) => {
  const [show, setShow] = createSignal(false);
  const [selected, setSelected] = createSignal("Choose");
  return (
    <>
      <div class="select">
        <div class="select-name">{props.name}</div>
        <div classList={{ "select-description": true, show: true }}>
          {props.desc}
        </div>
        <Switch>
          <Match when={props.options}>
            <p onClick={() => setShow(true)}>{selected()}</p>
            <Show when={show()}>
              <For each={props.options}>
                {(option) => (
                  <p
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
          </Match>
          <Match when={!props.options}>
            <input
              type="text"
              onInput={(e) => props.select(e.currentTarget.value)}
            ></input>
          </Match>
        </Switch>
      </div>
    </>
  );
};

const Options: Component = () => {
  return (
    <>
      <div>Options</div>
      <div style="display: flex">
        <For each={query.options}>
          {(option, index) => (
            <OptionBlock
              name={option.name}
              desc={option.desc}
              options={option.options ? option.options : undefined}
              select={(value) => (query.options[index()]["value"] = value)}
            ></OptionBlock>
          )}
        </For>
        <button
          onClick={() => {
            nextState("pagination", "");
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Options;
