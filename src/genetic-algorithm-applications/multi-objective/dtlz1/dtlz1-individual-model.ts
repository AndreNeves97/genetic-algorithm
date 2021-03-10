import { MultiObjectiveIndividual } from "../multi-objective-individual.model";

export class Dtlz1Individual extends MultiObjectiveIndividual {
  constructor(public genes: number[], public num_objectives: number) {
    super(genes, "");
  }

  mutate(): Dtlz1Individual {
    throw new Error("Method not implemented.");
  }

  recombine(father2: Dtlz1Individual): Dtlz1Individual[] {
    return this.crossoverBlxAlpha(father2).map(
      (genes) => new Dtlz1Individual(genes, this.num_objectives)
    );
  }

  getEvaluate() {
    if (!!this.functionValues) {
      return this.functionValues;
    }

    const f: number[] = Array.from({ length: this.num_objectives });
    const x = this.genes;

    const num_variables = this.genes.length;
    const k = num_variables - this.num_objectives + 1;

    let g = 0.0;
    for (let i = num_variables - k; i < num_variables; i++) {
      g +=
        (x[i] - 0.5) * (x[i] - 0.5) - Math.cos(20.0 * Math.PI * (x[i] - 0.5));
    }

    g = 100 * (k + g);
    for (let i = 0; i < this.num_objectives; i++) {
      f[i] = (1.0 + g) * 0.5;
    }

    for (let i = 0; i < this.num_objectives; i++) {
      for (let j = 0; j < this.num_objectives - (i + 1); j++) {
        f[i] *= x[j];
      }

      if (i != 0) {
        const aux = this.num_objectives - (i + 1);
        f[i] *= 1 - x[aux];
      }
    }

    this.functionValues = f;
    return this.functionValues;
  }
}
