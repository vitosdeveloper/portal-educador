"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errors = exports.er = void 0;
var er = function (err) {
    throw new Error(err);
};
exports.er = er;
exports.errors = {
    input: 'Preencha todos os campos.',
    login: 'Login ou senha incorretos, contate o diretor caso precise de ajuda.',
    turma: function (turma) { return 'Essa turma ' + turma + ' não existe.'; },
    materia: function (materia) { return 'Essa matéria ' + materia + ' não existe.'; },
    wrongProfessor: function (turma) { return 'Você não dá aula na ' + turma + '.'; },
    wrongMateria: function (materia) { return 'Você não dá aula de ' + materia + '.'; },
    dbAluno: 'Erro ao puxar dado dos alunos.',
    lonelyRoom: 'Essa turma aparentemente ainda não tem alunos.',
    estudante: 'Estudante não encontrado.',
    diretor: 'Você não é um diretor.',
};
