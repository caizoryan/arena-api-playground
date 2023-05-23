export type Section = { name: string; active: boolean };

export type State =
  | "endpoint"
  | "slug"
  | "action"
  | "options"
  | "pagination"
  | "end";

export type History = {
  state: State;
  query: State;
};

export type Options = {
  name: string;
  desc: string;
  value: string;
  options?: string[];
  type?: "text" | "number";
};

export type Query = {
  endpoint: string;
  slug: string;
  action: string;
  options: Options[];
  pagination: [];
};
