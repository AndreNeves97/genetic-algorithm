import { Individual } from "../../algorithms/shared/individual.model";

export class MultiObjectiveIndividual
  implements Individual<MultiObjectiveIndividual> {
  //
  evaluate: number;
  value: number;

  dominationSet: MultiObjectiveIndividual[];
  dominatedCount: number;
  rank: number;

  distance: number;

  public functionValues: number[];

  constructor(
    public genes: number[],
    public functions: Function[],
    public label: string
  ) {}

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

    this.functionValues = Array.from(
      { length: this.functions.length },
      (_, i) => this.functions[i].apply(this, this.genes)
    );

    return this.functionValues;
  }

  debugEvaluate() {
    throw new Error("Method not implemented.");
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
