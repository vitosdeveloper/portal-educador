export interface IProfessor {
  _id: string;
  nome: string;
  materias: string[];
  diretor: boolean;
  login: string;
  senha?: string;
}
