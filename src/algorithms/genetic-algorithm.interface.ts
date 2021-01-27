import { GeneticAlgorithmExecutionParams } from "./shared/genetic-algorithm-execution-params.model";

export interface GeneticAlgorithm {
  execute(params: GeneticAlgorithmExecutionParams);
}
