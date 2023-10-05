export const doesProfessorTeachHere = (
  professor: { materias: string[]; nome: string },
  turmaObj: {
    turma: string;
    slug: string;
    materias: string[];
  }
) => {
  for (let materia of professor.materias) {
    if (turmaObj.materias.includes(materia)) return true;
  }
  return false;
};

export const doesProfessorTeachThis = (
  professor: {
    materias: string[];
    nome: string;
  },
  materia: string
) => {
  for (let mate of professor.materias) {
    if (mate === materia) return true;
  }
  return false;
};
