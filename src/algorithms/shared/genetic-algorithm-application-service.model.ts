import { Individual } from "./individual.model";

export interface GaApplicationService<T extends Individual<any>> {
  getIndividuals(number: number): T[]
  getIndividual(num_genes: number): T
}