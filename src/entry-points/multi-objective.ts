import { GeneticAlgorithm } from "../algorithms/shared/genetic-algorithm.interface";
import { FGA } from "../algorithms/fga/fga.model";
import { PowellFunctionService } from "../genetic-algorithm-applications/real-functions/powell-function/powell-function.service";
import { NSGAService } from "../algorithms/nsga/nsga.service";
import { MultiObjectiveService } from "../genetic-algorithm-applications/multi-objective/multi-objective.service";

// let geneticAlgorithm: GeneticAlgorithm = new NSGA();
let geneticAlgorithm = new NSGAService();

const FUNCTIONS_DIMENSIONS = 1;

const functions = [
  (i) => {
    const values = [1, 2, 4, 3, 4, 5];
    return values[i];
  },
  (i) => {
    const values = [5, 3, 1, 4, 3, 5];
    return values[i];
  },
];

const result = geneticAlgorithm.execute({
  population_size: 6,
  next_generation_size: 4,
  num_generations: 1,
  application_service: new MultiObjectiveService(
    FUNCTIONS_DIMENSIONS,
    functions
  ),
});

// console.log("\n\n\n Result (Fronts):\n");

// console.dir(
//   result.fronts.map((front) =>
//     front.map((individual) => ({
//       name: individual.name,
//       val: individual.functionValues,
//       rank: individual.rank,
//     }))
//   ),
//   { depth: 5 }
// );
