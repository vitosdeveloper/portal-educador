import { er, errors } from '@/app/utils/errorUtils';
import { NextResponse } from 'next/server';
const jwt = require('jsonwebtoken');
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    let { username, password } = await request.json();
    username = username.trim();
    password = password.trim();
    if (username === '' || password === '') er(errors.input);
    if (username !== 'asd' || password !== 'asd') er(errors.login);
    const cookie = cookies();
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    cookie.set('jwt', token, { sameSite: 'none', secure: true });
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
