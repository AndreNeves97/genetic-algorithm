import { Random } from "../../random";
import { MultiObjectiveIndividual } from "./multi-objective-individual.model";

export class MultiObjectiveService {
  constructor(public qtFunctions: number) {}

  getIndividuals(): MultiObjectiveIndividual[] {
    let individuals = Array.from({ length: 20 }, () => this.getIndividual());
    return individuals;
  }

  getIndividual(): MultiObjectiveIndividual {
    const genes: number[] = Array.from({ length: 1 }, () =>
      Random.getDouble(-5, 5)
    );

    return new MultiObjectiveIndividual(genes);
  }
}
