import { MultiObjectiveIndividual } from "../../../genetic-algorithm-applications/multi-objective/multi-objective-individual.model";

export function getAllFronts(
  firstFront: MultiObjectiveIndividual[]
): MultiObjectiveIndividual[][] {
  const fronts: MultiObjectiveIndividual[][] = [firstFront];

  let i = 0;

  while (fronts[i].length != 0) {
    const newFront: MultiObjectiveIndividual[] = [];

    fronts[i].forEach((p) => {
      p.dominationSet.forEach((q) => {
        q.dominatedCount--;

        if (q.dominatedCount === 0) {
          q.rank = i + 2;
          newFront.push(q);
        }
      });
    });

    i++;
    fronts[i] = newFront;
  }

  return fronts;
}
