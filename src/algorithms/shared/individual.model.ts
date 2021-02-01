export interface Individual<T> {
  evaluate: number;
  value: number;

  mutate(): T;

  recombine(father2: T): T[];
  getEvaluate();
  debugEvaluate();
}
