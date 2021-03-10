import { MultiObjectiveIndividual } from "../multi-objective-individual.model";

export class GenericMultiObjectiveIndividual extends MultiObjectiveIndividual {
  constructor(
    public genes: number[],
    public functions: Function[],
    public label: string
  ) {
    super(genes, label);
  }

  mutate(): GenericMultiObjectiveIndividual {
    throw new Error("Method not implemented.");
  }

  recombine(father2: MultiObjectiveIndividual): MultiObjectiveIndividual[] {
    return this.crossoverBlxAlpha(father2).map(
      (genes) => new GenericMultiObjectiveIndividual(genes, this.functions, "")
    );
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
}
