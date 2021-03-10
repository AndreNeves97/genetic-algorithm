import { Individual } from "../../algorithms/shared/individual.model";
import { Random } from "../../random";

export abstract class MultiObjectiveIndividual
  implements Individual<MultiObjectiveIndividual> {
  value: number;

  dominationSet: MultiObjectiveIndividual[];
  dominatedCount: number;
  rank: number;

  distance: number;

  public functionValues: number[];

  constructor(public genes: number[], public label: string) {}

  abstract mutate(): MultiObjectiveIndividual;

  abstract recombine(
    father2: MultiObjectiveIndividual
  ): MultiObjectiveIndividual[];

  crossoverBlxAlpha(father2: MultiObjectiveIndividual): number[][] {
    const father1 = this;

    const num_dimensions = this.genes.length;

    const child1: number[] = new Array(num_dimensions);
    const child2: number[] = new Array(num_dimensions);

    father1.genes.forEach((gene_value, i) => {
      const alpha = Random.getGaussian();

      const diff = Math.abs(gene_value - father2.genes[i]);

      child1[i] = gene_value + alpha * diff;
      child2[i] = father2.genes[i] + alpha * diff;
    });

    return [child1, child2];
  }

  abstract getEvaluate();

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
