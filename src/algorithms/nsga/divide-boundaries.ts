import { MultiObjectiveIndividual } from "../../genetic-algorithm-applications/multi-objective/multi-objective-individual.model";
import { Individual } from "../shared/individual.model";

export function divideBoundaries(
  candidates: MultiObjectiveIndividual[]
): MultiObjectiveIndividual[][] {
  const boundaries: MultiObjectiveIndividual[][] = [
    getFirstBoundarie(candidates),
  ];

  printLogForFirstBoundarie(candidates);

  return boundaries;
}

function getFirstBoundarie(
  candidates: MultiObjectiveIndividual[]
): MultiObjectiveIndividual[] {
  const boundarie: MultiObjectiveIndividual[] = [];

  candidates.forEach((p) => {
    p.dominationSet = [];
    p.dominatedCount = 0;
    p.rank = 0;

    evaluatePairsDominance(p, candidates);

    if (p.dominatedCount === 0) {
      p.rank = 1;
      boundarie.push(p);
    }
  });

  return boundarie;
}

function evaluatePairsDominance(
  p: MultiObjectiveIndividual,
  candidates: MultiObjectiveIndividual[]
) {
  candidates.forEach((q) => {
    if (p === q) {
      return;
    }

    if (p.dominates(q)) {
      p.dominationSet.push(q);
      return;
    }

    if (q.dominates(p)) {
      p.dominatedCount++;
    }
  });
}

function printLogForFirstBoundarie(candidates) {
  console.log("\n\nPontos:\n");
  console.log(
    candidates.map((individual) => ({
      name: individual.name,
      val: individual.functionValues,
    }))
  );

  console.log("\n\nLog da primeira fronteira\n");
  console.log(
    candidates.map((a) => ({
      name: a.name,
      n: a.dominatedCount,
      set: a.dominationSet.map((g) => g.name),
      rank: a.rank,
    }))
  );
}
