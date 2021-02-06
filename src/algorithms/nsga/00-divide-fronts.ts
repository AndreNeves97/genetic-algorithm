import { MultiObjectiveIndividual } from "../../genetic-algorithm-applications/multi-objective/multi-objective-individual.model";
import { getFirstBoundarie } from "./01-first-fronts";
import { getAllFronts } from "./02-others-fronts";

export function divideFronts(
  candidates: MultiObjectiveIndividual[]
): MultiObjectiveIndividual[][] {
  const firstBoundarie = getFirstBoundarie(candidates);

  printLogForFirstBoundarie(candidates);

  return getAllFronts(firstBoundarie);
}

function printLogForFirstBoundarie(candidates) {
  console.log("\n\nPontos:\n");
  console.log(
    candidates.map((individual) => ({
      name: individual.name,
      val: individual.functionValues,
    }))
  );

  console.log("\n\n\nLog da primeira fronteira\n");
  console.log(
    candidates.map((a) => ({
      name: a.name,
      n: a.dominatedCount,
      set: a.dominationSet.map((g) => g.name),
      rank: a.rank,
    }))
  );
}
