import { GaApplicationService } from "./shared/genetic-algorithm-application-service.model";

export interface GeneticAlgorithmExecutionParams {
  population_size: number
  num_generations: number
  elite_size: number,
  application_service: GaApplicationService<any>
}