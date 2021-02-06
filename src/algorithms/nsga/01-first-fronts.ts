import { MultiObjectiveIndividual } from "../../genetic-algorithm-applications/multi-objective/multi-objective-individual.model";

export function getFirstBoundarie(
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
