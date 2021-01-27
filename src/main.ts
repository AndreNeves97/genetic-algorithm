import { GeneticAlgorithm } from "./algorithms/shared/genetic-algorithm.interface";
import { FGA } from "./algorithms/fga/fga.model";
import { NQueensService } from "./n-queens/n-queens.service"
import { PowellFunctionService } from "./real-functions/powell-function/powell-function.service";
let geneticAlgorithm: GeneticAlgorithm = new FGA()


powellFunction()
// nQueens()

function powellFunction() {
  let geneticAlgorithm: GeneticAlgorithm = new FGA()

  const FUNCTION_DIMENSION = 12
  
  const result = geneticAlgorithm.execute({
    population_size: 100,
    elite_size: 25,
    num_generations: 1000, 
    application_service: new PowellFunctionService(FUNCTION_DIMENSION)
  })

  console.log(result)
}


function nQueens() {
  const N_QUEENS_BOARD_SIZE = 8

  const result = geneticAlgorithm.execute({
    population_size: 40,
    elite_size: 8,
    num_generations: 50, 
    application_service: new NQueensService(N_QUEENS_BOARD_SIZE)
  })

  console.log(result)
}