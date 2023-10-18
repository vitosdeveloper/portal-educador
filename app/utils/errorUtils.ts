export const er = (err: string) => {
  throw new Error(err);
};

export const errors = {
  input: 'Preencha todos os campos.',
  login: 'Login ou senha incorretos, contate o diretor caso precise de ajuda.',
  turma: (turma: string) => 'Essa turma ' + turma + ' não existe.',
  materia: (materia: string) => 'Essa matéria ' + materia + ' não existe.',
  wrongProfessor: (turma: string) => 'Você não dá aula na ' + turma + '.',
  wrongMateria: (materia: string) => 'Você não dá aula de ' + materia + '.',
  dbAluno: 'Erro ao puxar dado dos alunos.',
  lonelyRoom: 'Essa turma aparentemente ainda não tem alunos.',
  estudante: 'Estudante não encontrado.',
  diretor: 'Você não é um diretor.',
  updateLength: 'Nenhum aluno foi alterado.',
  jwt: 'Login expirado ou inválido.',
  emptyFields: (campos: string[]) =>
    'Campo(s): "' + campos.join(', ') + '" vazio(s).',
  invalidMateria: (m: string[]) =>
    'Matéria(s): "' + m.join(', ') + '" não existe(m).',
  noChanges: 'Nenhuma alteração foi detectada.',
  noMateria: 'Nenhuma matéria foi selecionada.',
  hasAlready: 'Login já está em uso',
};
