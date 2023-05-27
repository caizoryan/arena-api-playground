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

type PaginationOption = {
  name: string;
  value: string | number;
  desc: string;
  type: string;
  options: string[];
};

export type Query = {
  endpoint: string;
  slug: string;
  token: string;
  action: string;
  method: string;
  options: Options[];
  pagination: PaginationOption[];
};
