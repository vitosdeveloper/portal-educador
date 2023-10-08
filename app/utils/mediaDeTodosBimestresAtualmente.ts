import { IBimestre } from '@/types/Student';

export const mediaDeTodosBimestresAtualmente = (
  bimestres: IBimestre[],
  quantidadeDeBimestres: number
) => {
  let mediaDeTodosBimestresAtualmente = 0;
  for (let i = 0; i < bimestres.length; i++) {
    if (i < quantidadeDeBimestres) {
      const { comportamento, presenca, prova, teste, tarefas } = bimestres[i];
      const media =
        ((comportamento || 0) +
          (presenca || 0) +
          (prova || 0) +
          (teste || 0) +
          (tarefas || 0)) /
        3;
      mediaDeTodosBimestresAtualmente += media;
    }
  }
  return Number(
    (mediaDeTodosBimestresAtualmente / quantidadeDeBimestres).toFixed(1)
  );
};
