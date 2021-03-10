import { MultiObjectiveIndividual } from "../../../genetic-algorithm-applications/multi-objective/multi-objective-individual.model";
import { getFirstFront } from "./01-get-first-front";
import { getAllFronts } from "./02-get-all-fronts";

export function divideFronts(
  candidates: MultiObjectiveIndividual[]
): MultiObjectiveIndividual[][] {
  const firstFront = getFirstFront(candidates);

  // printLogForFirstFront(candidates);

  return getAllFronts(firstFront);
}

function printLogForFirstFront(candidates) {
  console.log("\n\nPontos:\n");
  console.log(
    candidates.map((individual) => ({
      label: individual.label,
      val: individual.functionValues,
    }))
  );

  console.log("\n\n\nLog da primeira fronteira\n");
  console.log(
    candidates.map((a) => ({
      label: a.label,
      n: a.dominatedCount,
      set: a.dominationSet.map((g) => g.label),
      rank: a.rank,
    }))
  );
}
