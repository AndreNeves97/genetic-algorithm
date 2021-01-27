import { GeneticAlgorithm } from "../shared/genetic-algorithm.interface";
import { GeneticAlgorithmExecutionParams } from "../shared/genetic-algorithm-execution-params.model";
import { Individual } from "../shared/individual.model";
import { Random } from "../../random";

export class FGA implements GeneticAlgorithm {
  execute(params: GeneticAlgorithmExecutionParams) {
    console.log(params)

    const service = params.application_service
    
    let initial_population: Individual<any>[] = service.getIndividuals(params.population_size)
    
    let before_value = 0

    for (let i = 0; i < params.num_generations; i++) {
      const candidates = this.generateCandidates(initial_population)
      this.evaluateAllIndividuals(candidates)
      initial_population = this.generateNextGeneration(params, candidates)

      const best = this.getBestIndividual(initial_population)
      const error = Math.abs(best.value - before_value)
      before_value = best.value

      // console.log(best)
      console.log(`[${i}]  -  ${best.getEvaluate()} \t Value: ${best.value} \t\t Error in value: ${error}`)
    }

    return this.getBestIndividual(initial_population)
  }

  generateCandidates(initial_population: Individual<any>[]) {
    const recombinated = this.generateRecombinated(initial_population)
    const mutated = this.generateMutated(initial_population)


    const current_generation = [
      ...initial_population,
      ...recombinated,
      ...mutated
    ]

    return current_generation
  }

  generateRecombinated(initial_population: Individual<any>[]): Individual<any>[] {
    let recombinated = []

    for (let i = 1; i < initial_population.length; i += 2) {
      const father1 = initial_population[i - 1];
      const father2 = initial_population[i];
      
      const new_individuals = father1.recombine(father2)
      recombinated = [
        ...recombinated, 
        ...new_individuals
      ]
    }

    return recombinated
  }

  generateMutated(initial_population: Individual<any>[]): Individual<any>[] {
    return initial_population.map(
      individual => individual.mutate()
    );
  }
  
  evaluateAllIndividuals(individuals: Individual<any>[]) {
    individuals.sort((a, b) => a.getEvaluate() - b.getEvaluate())
  }

  generateNextGeneration(params: GeneticAlgorithmExecutionParams, candidates: Individual<any>[]): Individual<any>[] {
    const elite_size = params.elite_size

    const remaining = candidates.map(v => v)
    
    const next_generation: Individual<any>[] = [
      ...remaining.splice(-elite_size, elite_size)
    ]

    let total = 0
    remaining.forEach(individual => total += individual.getEvaluate())

    for (let i = 0; i < params.population_size - params.elite_size; i++) {  
      const limit = Random.getDouble(0, total)
      let sum = 0
      let j = 0  
      
      while (sum < limit && j < remaining.length - 1) {
        sum += remaining[j].getEvaluate()
        j++
      }

      const removed = remaining.splice(j, 1)[0]
      next_generation.push(removed)
    }
    
    return next_generation
  }

  getBestIndividual(individuals: Individual<any>[]) {
    let max = individuals[0]

    individuals.forEach(individual => {
      if(individual.getEvaluate() > max.getEvaluate()) {
        max = individual
      }
    })

    return max
  }
}