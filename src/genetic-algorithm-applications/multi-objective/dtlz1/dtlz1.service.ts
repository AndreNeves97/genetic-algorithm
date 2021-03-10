import { GaApplicationService } from "../../../algorithms/shared/genetic-algorithm-application-service.model";
import { Random } from "../../../random";
import { Dtlz1Individual } from "./dtlz1-individual-model";

export class Dtlz1Service implements GaApplicationService<Dtlz1Individual> {
  constructor(
    public functionsDimensions: number,
    public num_objectives: number
  ) {}

  getIndividuals(number: number): Dtlz1Individual[] {
    let individuals = Array.from({ length: number }, () =>
      this.getIndividual(this.functionsDimensions, this.num_objectives)
    );

    return individuals;
  }

  getRandomValueForDomain() {
    return Random.getDouble(0, 1);
  }

  getIndividual(num_genes: number, num_objectives: number): Dtlz1Individual {
    const genes: number[] = Array.from({ length: num_genes }, () =>
      this.getRandomValueForDomain()
    );

    return new Dtlz1Individual(genes, num_objectives);
  }
}
