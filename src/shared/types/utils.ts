export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type GetProps<T extends React.ComponentType<any>> =
  T extends React.StatelessComponent<infer SP> ? SP :
  T extends React.ComponentClass<infer CP> ? CP : never;
