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
