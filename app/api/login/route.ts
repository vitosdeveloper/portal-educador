import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    console.log(username, password);
    if (username !== 'asd' || password !== 'asd')
      throw new Error('Login ou senha incorretos.');
    return NextResponse.json({ message: 'success' });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Something went wrong',
      },
      { status: 500 }
    );
  }
}
