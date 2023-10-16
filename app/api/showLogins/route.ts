import { getCollection } from '@/app/db/getCollection';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    let logins: string[] = [];
    const professorCollection = await getCollection('professores');
    const diretorCollection = await getCollection('diretor');
    const professorQuery = await professorCollection
      ?.find({}, { projection: { login: 1, _id: 0 } })
      .toArray();
    const diretorQuery = await diretorCollection
      ?.find({}, { projection: { login: 1, _id: 0 } })
      .toArray();
    professorQuery?.forEach((i) => logins.push(i.login));
    diretorQuery?.forEach((i) => logins.push(i.login));
    return NextResponse.json(logins);
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
export const dynamic = 'force-dynamic';
