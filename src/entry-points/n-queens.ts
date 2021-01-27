import { GeneticAlgorithm } from "../algorithms/shared/genetic-algorithm.interface";
import { FGA } from "../algorithms/fga/fga.model";
import { NQueensService } from "../n-queens/n-queens.service";

let geneticAlgorithm: GeneticAlgorithm = new FGA();

const N_QUEENS_BOARD_SIZE = 8;

const result = geneticAlgorithm.execute({
  population_size: 40,
  elite_size: 8,
  num_generations: 50,
  application_service: new NQueensService(N_QUEENS_BOARD_SIZE),
});

console.log(result);
