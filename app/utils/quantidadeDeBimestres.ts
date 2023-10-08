import { IBimestre } from '@/types/Student';

export const quantidadeDeBimestres = (bimestres: IBimestre[]) => {
  let quantidadeDeBimestres = 0;
  for (let i = 0; i < bimestres.length; i++) {
    const { comportamento, presenca, prova, teste, tarefas } = bimestres[i];
    if (comportamento && presenca && prova && teste && tarefas) {
      quantidadeDeBimestres = i + 1;
    }
  }
  return quantidadeDeBimestres;
};
