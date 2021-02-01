import { MultiObjectiveIndividual } from "../../genetic-algorithm-applications/multi-objective/multi-objective-individual.model";
import { GeneticAlgorithmExecutionParams } from "../shared/genetic-algorithm-execution-params.model";
import { Individual } from "../shared/individual.model";

export class NSGAService {
  constructor() {}

  execute(params: GeneticAlgorithmExecutionParams) {
    const service = params.application_service;

    // let initial_population: MultiObjectiveIndividual[] = service.getIndividuals(
    //   params.population_size
    // );

    let initial_population: MultiObjectiveIndividual[] = this.getMockCandidates();

    for (let i = 0; i < params.num_generations; i++) {
      const candidates = this.generateCandidates(initial_population);
      this.evaluateAllIndividuals(candidates);
    }

    console.log("initial population", initial_population);

    return [1, 2, 3];
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

  getMockCandidates(): MultiObjectiveIndividual[] {
    return [
      [1, 5],
      [2, 3],
      [4, 1],
      [3, 4],
      [4, 3],
      [5, 5],
    ].map((functionValues) => {
      const individual = new MultiObjectiveIndividual([null, null]);
      individual.functionValues = functionValues;

      return individual;
    });
  }

  evaluateAllIndividuals(individuals: Individual<any>[]) {
    individuals.sort((a, b) => a.getEvaluate() - b.getEvaluate());
  }
}
