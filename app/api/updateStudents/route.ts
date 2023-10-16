import { getCollection } from '@/app/db/getCollection';
import { er, errors } from '@/app/utils/errorUtils';
import { isJwtValid } from '@/app/utils/isJwtValid';
import { IStudent } from '@/types/Student';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  try {
    if (!isJwtValid()) er(errors.jwt);
    const { changedStudents, materia } = await request.json();
    if (!changedStudents.length) er(errors.updateLength);
    const studentsCollection = await getCollection('alunos');
    const bulkUpdateOperations = (changedStudents as IStudent[]).map(
      (student) => {
        const materiaIndex = student.materias.findIndex(
          (m) => m.materia === materia
        );
        return {
          updateOne: {
            filter: { _id: new ObjectId(student._id) },
            update: {
              $set: {
                [`materias.${materiaIndex}`]: student.materias.find(
                  (m) => m.materia === materia
                ),
              },
            },
          },
        };
      }
    );
    const result = await studentsCollection?.bulkWrite(
      bulkUpdateOperations as any
    );
    if (!result?.modifiedCount) er(errors.updateLength);
    return NextResponse.json({ message: 'Alterados com sucesso.' });
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
