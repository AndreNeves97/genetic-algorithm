import { Individual } from "../../algorithms/shared/individual.model";

export class MultiObjectiveIndividual
  implements Individual<MultiObjectiveIndividual> {
  //
  evaluate: number;
  value: number;

  name: string;

  dominationSet: MultiObjectiveIndividual[];
  dominatedCount: number;
  rank: number;

  public functionValues: number[];

  constructor(public genes: number[]) {}

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
      this.evaluatePoint(this.genes[0], index)
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

  dominates(other: MultiObjectiveIndividual): boolean {
    let countMinorOrEquals = 0;
    let countMinor = 0;

    this.functionValues.forEach((value, index) => {
      const otherValue = other.functionValues[index];

      if (value <= otherValue) {
        countMinorOrEquals++;
      }

      if (value < otherValue) {
        countMinor++;
      }
    });

    if (countMinorOrEquals < this.functionValues.length) {
      return false;
    }

    if (countMinor < 1) {
      return false;
    }

    return true;
  }
}
