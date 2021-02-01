import { MultiObjectiveIndividual } from "../../genetic-algorithm-applications/multi-objective/multi-objective-individual.model";

export function getAllBoundaries(
  canditates: MultiObjectiveIndividual[],
  firstBoundarie: MultiObjectiveIndividual[]
): MultiObjectiveIndividual[][] {
  const boundaries: MultiObjectiveIndividual[][] = [firstBoundarie];

  let i = 0;

  while (boundaries[i].length != 0) {
    const newBoundarie: MultiObjectiveIndividual[] = [];

    boundaries[i].forEach((p) => {
      p.dominationSet.forEach((q) => {
        q.dominatedCount--;

        if (q.dominatedCount === 0) {
          q.rank = i + 2;
          newBoundarie.push(q);
        }
      });
    });

    i++;
    boundaries[i] = newBoundarie;
  }

  return boundaries;
}
