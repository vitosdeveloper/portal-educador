export interface IBimestre {
  teste: number | null;
  prova: number | null;
  presenca: number | null;
  tarefas: number | null;
  comportamento: number | null;
}
export interface IStudent {
  _id: string;
  nome: string;
  idade: number;
  turma: string;
  materias: {
    materia: string;
    bimestres: IBimestre[];
  }[];
  matriculado: boolean;
}

export const isStudent = (student: unknown): student is IStudent => {
  if (
    student &&
    typeof student === 'object' &&
    '_id' in student &&
    'nome' in student &&
    'idade' in student &&
    'turma' in student &&
    'materias' in student &&
    'matriculado' in student &&
    Array.isArray(student.materias) &&
    typeof student.materias[0] === 'object' &&
    'materia' in student.materias[0] &&
    'bimestres' in student.materias[0] &&
    'teste' in student.materias[0].bimestres[0] &&
    'prova' in student.materias[0].bimestres[0] &&
    'presenca' in student.materias[0].bimestres[0] &&
    'tarefas' in student.materias[0].bimestres[0] &&
    'comportamento' in student.materias[0].bimestres[0]
  ) {
    return true;
  }
  return false;
};
