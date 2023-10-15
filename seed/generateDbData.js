"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var turmas_1 = require("../app/utils/turmas");
var faker_1 = require("@faker-js/faker");
var materias_1 = require("../app/utils/materias");
var getCollection_1 = require("../app/db/getCollection");
var errorUtils_1 = require("../app/utils/errorUtils");
require('dotenv').config({ path: '.env.local' });
var bcrypt = require('bcrypt');
bcrypt.hash('asd', Number(process.env.BCRYPT_SALT), function (err, hashedPassword) { return __awaiter(void 0, void 0, void 0, function () {
    var generateNote, generatedStudents, generatedProfessors, strArr, addStudents, addProfessors, addDiretor, _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                generateNote = function (min, max) {
                    return Number(faker_1.faker.number.float({ min: min, max: max }).toFixed(1));
                };
                generatedStudents = turmas_1.turmas
                    .map(function (turma, index) {
                    var numberOfStudentsOnThisClass = faker_1.faker.number.int({
                        min: 22,
                        max: 30,
                    });
                    return new Array(numberOfStudentsOnThisClass)
                        .fill(undefined)
                        .map(function () { return ({
                        nome: faker_1.faker.person.fullName(),
                        idade: faker_1.faker.number.int({ min: 6 + index, max: 8 + index }),
                        turma: turma.slug,
                        materias: turma.materias.map(function (materia) { return ({
                            materia: materia,
                            bimestres: __spreadArray(__spreadArray([], new Array(3).fill(undefined).map(function () { return ({
                                teste: generateNote(4, 10),
                                prova: generateNote(4, 10),
                                presenca: generateNote(1, 4),
                                tarefas: generateNote(1, 4),
                                comportamento: generateNote(1, 2),
                            }); }), true), [
                                {
                                    teste: null,
                                    prova: null,
                                    presenca: null,
                                    tarefas: generateNote(1, 4),
                                    comportamento: null,
                                },
                            ], false),
                        }); }),
                        matriculado: true,
                    }); });
                })
                    .flat();
                generatedProfessors = materias_1.materias
                    .map(function (materia) {
                    var numberOfProfessors = faker_1.faker.number.int({ min: 1, max: 2 });
                    return new Array(numberOfProfessors).fill(undefined).map(function () { return ({
                        nome: faker_1.faker.person.fullName(),
                        materias: [materia.materia],
                        diretor: false,
                        login: faker_1.faker.person.firstName(),
                        senha: hashedPassword,
                    }); });
                })
                    .flat();
                strArr = {
                    stu: ['Erro ao gerar os estudantes.', 'Alunos adicionados com sucesso!'],
                    pro: [
                        'Erro ao gerar os professores.',
                        'Professores adicionados com sucesso!',
                    ],
                    dir: ['Erro ao gerar o diretor.', 'Diretor adicionado com sucesso!'],
                };
                addStudents = function (collection) { return __awaiter(void 0, void 0, void 0, function () {
                    var query;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (collection === null || collection === void 0 ? void 0 : collection.insertMany(generatedStudents))];
                            case 1:
                                query = _a.sent();
                                if (!query || !query.acknowledged)
                                    (0, errorUtils_1.er)(strArr.stu[0]);
                                console.log(strArr.stu[1]);
                                return [2 /*return*/];
                        }
                    });
                }); };
                addProfessors = function (collection) { return __awaiter(void 0, void 0, void 0, function () {
                    var query;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (collection === null || collection === void 0 ? void 0 : collection.insertMany(generatedProfessors))];
                            case 1:
                                query = _a.sent();
                                if (!query || !query.acknowledged)
                                    (0, errorUtils_1.er)(strArr.pro[0]);
                                console.log(strArr.pro[1]);
                                return [2 /*return*/];
                        }
                    });
                }); };
                addDiretor = function (collection) { return __awaiter(void 0, void 0, void 0, function () {
                    var query;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (collection === null || collection === void 0 ? void 0 : collection.insertOne({
                                    nome: faker_1.faker.person.fullName(),
                                    materias: materias_1.materias.map(function (_a) {
                                        var materia = _a.materia;
                                        return materia;
                                    }),
                                    diretor: true,
                                    login: faker_1.faker.person.firstName(),
                                    senha: hashedPassword,
                                }))];
                            case 1:
                                query = _a.sent();
                                if (!query || !query.acknowledged)
                                    (0, errorUtils_1.er)(strArr.dir[0]);
                                console.log(strArr.dir[1]);
                                return [2 /*return*/];
                        }
                    });
                }); };
                _a = addStudents;
                return [4 /*yield*/, (0, getCollection_1.getCollection)('alunos')];
            case 1: return [4 /*yield*/, _a.apply(void 0, [_d.sent()])];
            case 2:
                _d.sent();
                _b = addProfessors;
                return [4 /*yield*/, (0, getCollection_1.getCollection)('professores')];
            case 3: return [4 /*yield*/, _b.apply(void 0, [_d.sent()])];
            case 4:
                _d.sent();
                _c = addDiretor;
                return [4 /*yield*/, (0, getCollection_1.getCollection)('diretor')];
            case 5: return [4 /*yield*/, _c.apply(void 0, [_d.sent()])];
            case 6:
                _d.sent();
                process.exit(0);
                return [2 /*return*/];
        }
    });
}); });
