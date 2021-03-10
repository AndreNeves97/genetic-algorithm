import { GaApplicationService } from "../../../algorithms/shared/genetic-algorithm-application-service.model";
import { GenericMultiObjectiveIndividual } from "./generic-multi-objective-individual.model";

export class GenericMultiObjectiveService
  implements GaApplicationService<GenericMultiObjectiveIndividual> {
  constructor(
    public functionsDimensions: number,
    public functions: Function[]
  ) {}

  getIndividuals(number: number): GenericMultiObjectiveIndividual[] {
    const labels = ["A", "B", "C", "D", "E", "F"];

    let individuals = Array.from({ length: number }, (v, k) => {
      const genes: number[] = Array.from(
        { length: this.functionsDimensions },
        () => k
      );

      return new GenericMultiObjectiveIndividual(
        genes,
        this.functions,
        labels[k]
      );
    });

    return individuals;
  }
}
