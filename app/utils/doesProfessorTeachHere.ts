export const doesProfessorTeachHere = (
  professor: { materias: string[]; nome: string; diretor: boolean },
  turmaObj: {
    turma: string;
    slug: string;
    materias: string[];
  }
) => {
  if (professor.diretor) return true;
  for (let materia of professor.materias) {
    if (turmaObj.materias.includes(materia)) return true;
  }
  return false;
};

export const doesProfessorTeachThis = (
  professor: {
    materias: string[];
    nome: string;
    diretor: boolean;
  },
  materia: string
) => {
  if (professor.diretor) return true;
  for (let mate of professor.materias) {
    if (mate === materia) return true;
  }
  return false;
};
