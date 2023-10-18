import { getCollection } from '@/app/db/getCollection';
import { er, errors } from '@/app/utils/errorUtils';
import { materias as materiasExistentes } from '@/app/utils/materias';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body.materias.length) er(errors.noMateria);
    let campos: string[] = [];
    for (const key in body) {
      if (!Array.isArray(body[key])) {
        body[key].trim() === '' && campos.push(key);
      } else {
        const emptyMaterias = body[key].filter((i: string) => i.trim() === '');
        emptyMaterias.length && campos.push(key);
      }
    }
    if (campos.length) er(errors.emptyFields(campos));
    const validMaterias = materiasExistentes.map((m) => m.materia);
    const invalidMaterias = body.materias.filter(
      (m: string) => !validMaterias.includes(m)
    );
    if (invalidMaterias.length) er(errors.invalidMateria(invalidMaterias));
    const { _id, materias, nome, login, originalLogin } = body;
    const professorsCollection = await getCollection('professores');
    if (originalLogin !== login) {
      const hasAnotherProfessor = await professorsCollection?.findOne({
        login,
      });
      if (hasAnotherProfessor) er(errors.hasAlready);
    }
    const query = await professorsCollection?.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { materias, nome, login } }
    );
    if (!query?.modifiedCount) er(errors.noChanges);
    return NextResponse.json({ materias, nome, login });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Opps! Houve algum erro no servidor.',
      },
      { status: 500 }
    );
  }
}
