import { Individual } from "../../algorithms/shared/individual.model";
import { Random } from "../../random";

export class NQueensIndividual implements Individual<NQueensIndividual> {
  evaluate: number;
  value: number;

  board_graphic: string = "";
  genes: number[];

  constructor(genes: number[]) {
    this.genes = genes;
    this.evaluate = -1;
  }

  mutate(): NQueensIndividual {
    const new_individual_genes = this.genes.map((gene) => gene);

    let index1 = Random.getInt(0, this.genes.length);
    let index2;

    do {
      index2 = Random.getInt(0, this.genes.length);
    } while (index1 === index2);

    const old_gene = new_individual_genes[index1];
    new_individual_genes[index1] = new_individual_genes[index2];
    new_individual_genes[index2] = old_gene;

    return new NQueensIndividual(new_individual_genes);
  }

  recombine(father2: NQueensIndividual): NQueensIndividual[] {
    const father1 = this;

    const num_genes = this.genes.length;
    const cut_index = Random.getInt(0, num_genes - 1) + 1;

    const child1_start = father1.genes.slice(0, cut_index);
    const child1_end = father2.genes.slice(cut_index, num_genes);

    const child2_start = father2.genes.slice(0, cut_index);
    const child2_end = father1.genes.slice(cut_index, num_genes);

    this.eliminate_repetitions_after_recombining(child1_start, child1_end);
    this.eliminate_repetitions_after_recombining(child2_start, child2_end);

    const child1 = [...child1_start, ...child1_end];
    const child2 = [...child2_start, ...child2_end];

    return [new NQueensIndividual(child1), new NQueensIndividual(child2)];
  }

  private eliminate_repetitions_after_recombining(start, end) {
    start.forEach((gene) => {
      while (end.includes(gene)) {
        const element_index = end.indexOf(gene);
        end[element_index] = -1;
      }
    });

    const num_genes = this.genes.length;

    while (end.includes(-1)) {
      const next_undefined_index = end.indexOf(-1);
      const complete_gene = [...start, ...end];
      const value = Random.getIntWithoutRepetition(0, num_genes, complete_gene);

      end[next_undefined_index] = value;
    }
  }

  getEvaluate() {
    if (this.evaluate !== -1) {
      return this.evaluate;
    }

    this.processBoardGraphic();

    let sum = 0;

    for (let i = 0; i < this.genes.length; i++) {
      const gene1 = this.genes[i];

      for (let j = i + 1; j < this.genes.length; j++) {
        const gene2 = this.genes[j];

        const condition1 = gene1 === gene2;
        const condition2 = gene1 === gene2 - Math.abs(j - i);
        const condition3 = gene1 === gene2 + Math.abs(j - i);

        if (condition1 || condition2 || condition3) {
          sum++;
        }
      }
    }

    this.value = sum;
    this.evaluate = 1 / sum;

    return this.evaluate;
  }

  debugEvaluate() {
    for (let i = 0; i < this.genes.length; i++) {
      const gene1 = this.genes[i];

      for (let j = i + 1; j < this.genes.length; j++) {
        const gene2 = this.genes[j];

        const condition1 = gene1 === gene2;
        const condition2 = gene1 === gene2 - Math.abs(j - i);
        const condition3 = gene1 === gene2 + Math.abs(j - i);

        console.log(i, j);
        if (condition1 || condition2 || condition3) {
          console.log(condition1, condition2, condition3);
        }
      }
    }
  }

  processBoardGraphic() {
    let string = "                    \n";
    string += "                                 \n";

    for (let i = 0; i < this.genes.length; i++) {
      for (let j = 0; j < this.genes.length; j++) {
        if (i === this.genes[j]) {
          string += "x  ";
          continue;
        }

        string += ".  ";
      }

      string += "         \n";
    }

    this.board_graphic = string;
  }
}
