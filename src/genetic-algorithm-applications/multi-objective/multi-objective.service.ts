import { GaApplicationService } from "../../algorithms/shared/genetic-algorithm-application-service.model";
import { Random } from "../../random";
import { MultiObjectiveIndividual } from "./multi-objective-individual.model";

export class MultiObjectiveService
  implements GaApplicationService<MultiObjectiveIndividual> {
  constructor(
    public functionsDimensions: number,
    public functions: Function[]
  ) {}

  getIndividuals(number: number): MultiObjectiveIndividual[] {
    const labels = ["A", "B", "C", "D"];

    let individuals = Array.from({ length: number }, (v, k) => {
      const genes: number[] = Array.from(
        { length: this.functionsDimensions },
        () => k
      );

      return new MultiObjectiveIndividual(genes, this.functions, labels[k]);
    });

    return individuals;
  }

  getIndividual(num_genes: number): MultiObjectiveIndividual {
    const genes: number[] = Array.from({ length: num_genes }, () =>
      Random.getDouble(-5, 5)
    );

    return new MultiObjectiveIndividual(genes, this.functions, "");
  }
}
