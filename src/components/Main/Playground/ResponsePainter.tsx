import {
  Component,
  createMemo,
  createSignal,
  For,
  Match,
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
    <div
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          setExpand(!expand());
        }
      }}
      class={expand() ? "box-expanded" : "box"}
    >
      <Show when={!expand()}>
        <p onClick={() => setExpand(!expand())}>
          {props.key} : <span class="expandable">{"[......]"}</span>
        </p>
      </Show>
      <Show when={expand()}>
        <p onClick={() => setExpand(!expand())}> {props.key}: [ </p>
        <For each={props.value}>
          {(dog, i) =>
            typeof dog === "number" ? (
              KeyStringPair({ key: i().toString(), value: dog.toString() })
            ) : (
              <KeyObject
                key={i().toString()}
                value={Object.entries(dog)}
              ></KeyObject>
            )
          }
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

const KeyObject: Component<{ key: string; value: any[] }> = (props) => {
  const [expand, setExpand] = createSignal(false);
  return (
    <>
      <div
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setExpand(!expand());
          }
        }}
        class={expand() ? "box-expanded" : "box"}
      >
        <Show when={!expand()}>
          <p onClick={() => setExpand(!expand())}>
            {props.key + ": "}
            <span class="expandable">{"{......}"}</span>
          </p>
        </Show>
        <Show when={expand()}>
          <p onClick={() => setExpand(!expand())}> {props.key + ": { "}</p>
          <For each={props.value}>
            {(values) => {
              if (typeof values[1] === "string") {
                return KeyStringPair({ key: values[0], value: values[1] });
              } else if (typeof values[1] === "number") {
                return (
                  <KeyStringPair
                    key={values[0]}
                    value={values[1].toString()}
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
          <p style={"width: 100%"}>Click to expand or collapse</p>
          <br></br>
          <KeyObject key="response" value={responseArray()}></KeyObject>
        </Match>
      </Switch>
    </div>
  );
};

export default ResponsePainter;
