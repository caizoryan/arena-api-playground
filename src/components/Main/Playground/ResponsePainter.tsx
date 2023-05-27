import {
  Component,
  createEffect,
  createMemo,
  createSignal,
  For,
  Match,
  onMount,
  Show,
  Switch,
} from "solid-js";
import "../../../styles/playground.css";
import "../../../styles/resourcePainter.css";

export const [loading, setLoading] = createSignal(false);
export const [requested, setRequested] = createSignal(false);
export const [response, setResponse] = createSignal({});

const responseArray = createMemo(() => Object.entries(response()));

const KeyArrayPair: Component<{ key: string; value: any[] }> = (props) => {
  const [expand, setExpand] = createSignal(false);
  return (
    <div class={expand() ? "box-expanded" : "box"}>
      <Show when={!expand()}>
        <p>{props.key} : [......]</p>
        <button class="expand" onClick={() => setExpand(true)}>
          Expand
        </button>
      </Show>
      <Show when={expand()}>
        <p> {props.key}: [ </p>
        <For each={props.value}>
          {(dog, i) => (
            <KeyObject
              key={i().toString()}
              value={Object.entries(dog)}
            ></KeyObject>
          )}
        </For>
        <p> ] </p>
      </Show>
    </div>
  );
};

const KeyStringPair: Component<{ key: string; value: string }> = (props) => {
  return (
    <div class="box">
      <p>
        {props.key} : {props.value}
      </p>
    </div>
  );
};

const Keys: Component = () => <></>;

const KeyObject: Component<{ key: string; value: any[] }> = (props) => {
  const [expand, setExpand] = createSignal(false);
  return (
    <>
      <div class={expand() ? "box-expanded" : "box"}>
        <Show when={!expand()}>
          <p>{props.key + " : {......}"}</p>
        </Show>
        <button class="expand" onClick={() => setExpand(!expand())}>
          {expand() ? "Collapse" : "Expand"}
        </button>
        <Show when={expand()}>
          <p> {props.key + ": { "}</p>
          <For each={props.value}>
            {(values) => {
              if (typeof values[1] === "string") {
                return (
                  <KeyStringPair
                    key={values[0]}
                    value={values[1]}
                  ></KeyStringPair>
                );
              } else if (Array.isArray(values[1])) {
                return (
                  <KeyArrayPair
                    key={values[0]}
                    value={values[1]}
                  ></KeyArrayPair>
                );
              } else if (typeof values[1] === "object" && values[1] !== null) {
                return (
                  <KeyObject
                    key={values[0]}
                    value={Object.entries(values[1])}
                  ></KeyObject>
                );
              } else if (typeof values[1] == null) {
                return (
                  <KeyStringPair key={values[0]} value={"null"}></KeyStringPair>
                );
              }
            }}
          </For>
          <p> {"}"} </p>
        </Show>
      </div>
    </>
  );
};

const ResponsePainter: Component = () => {
  return (
    <div class="container">
      <Switch>
        <Match when={requested() && loading()}>Loading...</Match>
        <Match when={requested() && !loading()}>
          <KeyObject key="response" value={responseArray()}></KeyObject>
        </Match>
      </Switch>
    </div>
  );
};

export default ResponsePainter;
