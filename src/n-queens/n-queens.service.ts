import { GaApplicationService } from "../algorithms/shared/genetic-algorithm-application-service.model";
import { NQueensIndividual } from "./n-queens-individual.model";
import { Random } from "../random";

export class NQueensService implements GaApplicationService<NQueensIndividual> {
  board_size: number
  
  constructor(board_size: number) {
    this.board_size = board_size
  }

  
  getIndividuals(number: number): NQueensIndividual[] {
    let individuals = Array.from(
      {length: number}, 
      () => this.getIndividual(this.board_size)
    )

    return individuals
  }

  getIndividual(num_genes: number) {
    const genes: number[] = Array.from(
      {length: num_genes},
      () => Random.getInt(0, num_genes)
    );

    return new NQueensIndividual(genes);
  }
}