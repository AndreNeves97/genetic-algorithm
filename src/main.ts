import { GeneticAlgorithm } from "./algorithms/shared/genetic-algorithm.interface";
import { FGA } from "./algorithms/fga/fga.model";
import { NQueensService } from "./n-queens/n-queens.service"
import { PowellFunctionService } from "./real-functions/powell-function/powell-function.service";
let geneticAlgorithm: GeneticAlgorithm = new FGA()


