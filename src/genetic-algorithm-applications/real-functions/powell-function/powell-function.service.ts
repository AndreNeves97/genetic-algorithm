import { GaApplicationService } from "../../../algorithms/shared/genetic-algorithm-application-service.model";
import { Random } from "../../../random";
import { PowellFunctionIndividual } from "./powell-function-individual.model";

export class PowellFunctionService
  implements GaApplicationService<PowellFunctionIndividual> {
  dimensions: number;

  constructor(dimensions: number) {
    this.dimensions = dimensions;

    if (dimensions % 4 != 0) {
      this.dimensions += 4 - (dimensions % 4);
    }
  }

  getIndividuals(number: number): PowellFunctionIndividual[] {
    let individuals = Array.from({ length: number }, () =>
      this.getIndividual(this.dimensions)
    );

    return individuals;
  }

  getRandomValueForDomain() {
    const value1 = Random.getDouble(3, 5);
    const value2 = Random.getDouble(-4, -2);

    const random_rate = Random.getDouble(0, 1);

    if (random_rate >= 0.5) {
      return value1;
    }

    return value2;
  }

  getIndividual(num_genes: number) {
    const genes: number[] = Array.from({ length: num_genes }, () =>
      this.getRandomValueForDomain()
    );

    return new PowellFunctionIndividual(genes);
  }
}
