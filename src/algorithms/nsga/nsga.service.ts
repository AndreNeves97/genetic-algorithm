import { MultiObjectiveIndividual } from "../../genetic-algorithm-applications/multi-objective/multi-objective-individual.model";
import { GeneticAlgorithmExecutionParams } from "../shared/genetic-algorithm-execution-params.model";
import { Individual } from "../shared/individual.model";
import { setCrowdingDistanceAssignment } from "./crowding-disitance-assignment/crowding-distance-assignment";
import { divideFronts } from "./fast-non-dominated-sort/00-divide-fronts";

export class NSGAService {
  constructor() {}

  execute(params: GeneticAlgorithmExecutionParams) {
    const service = params.application_service;

    let initial_population: MultiObjectiveIndividual[] = service.getIndividuals(
      params.population_size
    );

    for (let t = 0; t < params.num_generations; t++) {
      const candidates = this.generateCandidates(initial_population);
      this.evaluateAllIndividuals(candidates);

      const fronts = divideFronts(candidates);

      this.printGenerationLog(initial_population);

      initial_population = this.getNextGenenration(
        fronts,
        params.population_size
      );
    }

    console.log("\n\nUltima geração:\n\n");
    this.printGenerationLog(initial_population);
  }

  printGenerationLog(population: MultiObjectiveIndividual[]) {
    console.log("\n");
    console.log(
      population.map((a) => a.functionValues.map((value) => value.toFixed(2)))
    );
  }

  getNextGenenration(fronts, n): MultiObjectiveIndividual[] {
    const next_generation = [];

    let i = 0;

    while (
      i < fronts.length &&
      next_generation.length + fronts[i].length <= n
    ) {
      next_generation.push(...fronts[i]);
      i++;
    }

    if (i < fronts.length) {
      setCrowdingDistanceAssignment(fronts[i]);

      fronts[i].sort((a, b) => b.distance - a.distance);

      const remaining_individuals_next_generation = n - next_generation.length;

      next_generation.push(
        ...fronts[i].slice(0, remaining_individuals_next_generation)
      );
    }

    return next_generation;
  }

  generateCandidates(initial_population: Individual<any>[]) {
    const recombinated = this.generateRecombinated(initial_population);
    const mutated = [];

    const current_generation = [
      ...initial_population,
      ...recombinated,
      ...mutated,
    ];

    return current_generation;
  }

  generateRecombinated(
    initial_population: Individual<any>[]
  ): Individual<any>[] {
    let recombinated = [];

    for (let i = 1; i < initial_population.length; i += 2) {
      const father1 = initial_population[i - 1];
      const father2 = initial_population[i];

      const new_individuals = father1.recombine(father2);
      recombinated = [...recombinated, ...new_individuals];
    }

    return recombinated;
  }

  evaluateAllIndividuals(individuals: Individual<any>[]) {
    individuals.sort((a, b) => a.getEvaluate() - b.getEvaluate());
  }
}
