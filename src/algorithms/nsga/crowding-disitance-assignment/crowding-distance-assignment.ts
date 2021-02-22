import { MultiObjectiveIndividual } from "../../../genetic-algorithm-applications/multi-objective/multi-objective-individual.model";

export function setCrowdingDistanceAssignment(
  candidates: MultiObjectiveIndividual[]
): MultiObjectiveIndividual[][] {
  const objectives = candidates[0].functions.length;

  const l = candidates.length;

  candidates.forEach((candidate) => (candidate.distance = 0));

  for (let m = 0; m < objectives; m++) {
    const T = candidates
      .map((c) => c)
      .sort((a, b) => a.functionValues[m] - b.functionValues[m]);

    T[0].distance = Infinity;
    T[l - 1].distance = Infinity;

    const min = T[0].functionValues[m];
    const max = T[l - 1].functionValues[m];

    for (let i = 1; i <= l - 2; i++) {
      const diff = T[i + 1].functionValues[m] - T[i - 1].functionValues[m];
      const aux = diff / (max - min);

      T[i].distance = T[i].distance + aux;
    }

    printLogForObjective(m, T);
  }

  return null;
}

function printLogForObjective(index, candidates: MultiObjectiveIndividual[]) {
  console.log(`\n\Objetivo ${index}:\n`);

  console.log(
    candidates.map((candidate) => {
      const { label, distance, functionValues } = candidate;
      return {
        label,
        distance: Math.floor(distance * 1000) / 1000,
        functionValues,
      };
    })
  );
}
