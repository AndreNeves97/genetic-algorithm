import { RealFunctionIndividual } from "../real-function-individual.model";

export class PowellFunctionIndividual extends RealFunctionIndividual<PowellFunctionIndividual> {
  constructor(dimensions: number[]) {
    super(dimensions)
  }

  getObj(dimensions: number[]): PowellFunctionIndividual {
    return new PowellFunctionIndividual(dimensions)
  }

  getEvaluate() {
    if(this.evaluate !== -1) {
      return this.evaluate
    }

    const x = this.dimensions;

    let sum = 0;

    for (let i = 0; i < x.length; i += 4) {
      const a =       (x[0] + 10 * x[1]) ** 2
      const b = 5 * ( (x[2] +      x[3]) ** 2 )
      const c =       (x[1] -  2 * x[2]) ** 4
      const d = 10 * ((x[0] -      x[3]) ** 4 )

      sum += a + b + c + d
    }

    this.value = sum
    this.evaluate = 1 / sum
    return this.evaluate
  }
}