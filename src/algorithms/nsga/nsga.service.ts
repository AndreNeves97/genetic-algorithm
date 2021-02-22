import { MultiObjectiveIndividual } from "../../genetic-algorithm-applications/multi-objective/multi-objective-individual.model";
import { GeneticAlgorithmExecutionParams } from "../shared/genetic-algorithm-execution-params.model";
import { Individual } from "../shared/individual.model";
import { divideFronts } from "./fast-non-dominated-sort/00-divide-fronts";

export class NSGAService {
  constructor() {}

  execute(params: GeneticAlgorithmExecutionParams) {
    const service = params.application_service;

    let initial_population: MultiObjectiveIndividual[] = service.getIndividuals(
      params.population_size
    );

    let fronts;

    for (let i = 0; i < params.num_generations; i++) {
      const candidates = this.generateCandidates(initial_population);

      // fronts = divideFronts(candidates);
      this.evaluateAllIndividuals(candidates);
      console.log("candidates", candidates);
    }

    // console.log("initial population", initial_population);

    return { fronts: fronts };
  }

  generateCandidates(initial_population: Individual<any>[]) {
    const recombinated = [];
    const mutated = [];

    const current_generation = [
      ...initial_population,
      ...recombinated,
      ...mutated,
    ];

    return current_generation;
  }

  evaluateAllIndividuals(individuals: Individual<any>[]) {
    individuals.sort((a, b) => a.getEvaluate() - b.getEvaluate());
  }
}
