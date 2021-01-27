import { Individual } from "../../algorithms/shared/individual.model";
import { Random } from "../../random";

export class RealFunctionIndividual<T>
  implements Individual<RealFunctionIndividual<T>> {
  evaluate: number;
  value: number;
  board_graphic: string = "";
  dimensions: number[];

  constructor(dimensions: number[]) {
    this.dimensions = dimensions;
    this.evaluate = -1;
  }

  getObj(dimensions: number[]): RealFunctionIndividual<T> {
    return new RealFunctionIndividual(dimensions);
  }

  mutate(): RealFunctionIndividual<T> {
    const mutation_rate = 0.1;

    let changed = false;

    const new_individual_genes = this.dimensions.map((dimension_value) => {
      const random_rate = Random.getDouble(0, 1);

      if (random_rate >= mutation_rate) {
        return dimension_value;
      }

      changed = true;
      return dimension_value + Random.getGaussian();
    });

    if (!changed) {
      const index = Random.getInt(0, this.dimensions.length);
      new_individual_genes[index] += Random.getGaussian();
    }

    return this.getObj(new_individual_genes);
  }

  recombine(father2: RealFunctionIndividual<T>): RealFunctionIndividual<T>[] {
    const father1 = this;
    const alpha = 0.33;

    const num_dimensions = this.dimensions.length;

    const child1 = new Array(num_dimensions);
    const child2 = new Array(num_dimensions);

    father1.dimensions.forEach((dimension_value, i) => {
      child1[i] = (1 - alpha) * dimension_value + alpha * father2.dimensions[i];
      child2[i] = (1 - alpha) * father2.dimensions[i] + alpha * dimension_value;
    });

    return [this.getObj(child1), this.getObj(child2)];
  }

  getEvaluate() {}

  debugEvaluate() {}
}
