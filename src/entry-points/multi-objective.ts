import { GeneticAlgorithm } from "../algorithms/shared/genetic-algorithm.interface";
import { FGA } from "../algorithms/fga/fga.model";
import { PowellFunctionService } from "../genetic-algorithm-applications/real-functions/powell-function/powell-function.service";
import { NSGAService } from "../algorithms/nsga/nsga.service";
import { Dtlz1Service } from "../genetic-algorithm-applications/multi-objective/dtlz1/dtlz1.service";

// let geneticAlgorithm: GeneticAlgorithm = new NSGA();
let geneticAlgorithm = new NSGAService();

const FUNCTIONS_DIMENSIONS = 7;
const NUM_OBJECTIVES = 3;

const result = geneticAlgorithm.execute({
  population_size: 20,
  num_generations: 1,
  application_service: new Dtlz1Service(FUNCTIONS_DIMENSIONS, NUM_OBJECTIVES),
});
