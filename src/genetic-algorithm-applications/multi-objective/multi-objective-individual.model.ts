import { Individual } from "../../algorithms/shared/individual.model";

export class MultiObjectiveIndividual
  implements Individual<MultiObjectiveIndividual> {
  //
  evaluate: number;
  value: number;

  public functionValues: number[];

  constructor(public points: number[]) {}

  mutate(): MultiObjectiveIndividual {
    throw new Error("Method not implemented.");
  }

  recombine(father2: MultiObjectiveIndividual): MultiObjectiveIndividual[] {
    throw new Error("Method not implemented.");
  }

  getEvaluate() {
    if (!!this.functionValues) {
      return this.functionValues;
    }

    this.functionValues = Array.from({ length: 2 }, (_, index) =>
      this.evaluatePoint(this.points[0], index)
    );

    return this.functionValues;
  }

  debugEvaluate() {
    throw new Error("Method not implemented.");
  }

  evaluatePoint(value, functionIndex) {
    if (functionIndex === 0) {
      return Math.pow(value, 2);
    }

    if (functionIndex === 1) {
      return Math.pow(value - 1, 2);
    }

    return null;
  }

  dominates(other: MultiObjectiveIndividual) {}
}
