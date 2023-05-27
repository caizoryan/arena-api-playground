import { Component, Switch, Match } from "solid-js";
import { refreshQuery } from "../Main/Playground/Querybuilder/QueryDisplay";
import { DropDown } from "./DropDown";

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
              onInput={(e) => {
                props.select(e.currentTarget.value);
                refreshQuery();
              }}
            ></input>
          </Match>
        </Switch>
      </div>
    </>
  );
};
