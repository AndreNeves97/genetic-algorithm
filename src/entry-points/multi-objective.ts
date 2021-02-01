import { GeneticAlgorithm } from "../algorithms/shared/genetic-algorithm.interface";
import { FGA } from "../algorithms/fga/fga.model";
import { PowellFunctionService } from "../genetic-algorithm-applications/real-functions/powell-function/powell-function.service";
import { NSGAService } from "../algorithms/nsga/nsga.service";
import { MultiObjectiveService } from "../genetic-algorithm-applications/multi-objective/multi-objective.service";

// let geneticAlgorithm: GeneticAlgorithm = new NSGA();
let geneticAlgorithm = new NSGAService();

const QT_FUNCTIONS = 2;

const result = geneticAlgorithm.execute({
  population_size: 20,
  num_generations: 1,
  application_service: new MultiObjectiveService(QT_FUNCTIONS),
});

console.log("\n\n\n Result (boundaries):\n");

console.dir(
  result.map((boundarie) =>
    boundarie.map((individual) => ({
      name: individual.name,
      val: individual.functionValues,
      rank: individual.rank,
    }))
  ),
  { depth: 5 }
);
