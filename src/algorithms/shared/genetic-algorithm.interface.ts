import { GeneticAlgorithmExecutionParams } from "./genetic-algorithm-execution-params.model";

export interface GeneticAlgorithm {
  execute(params: GeneticAlgorithmExecutionParams);
}