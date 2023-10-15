import { er, errors } from '@/app/utils/errorUtils';
import { NextResponse } from 'next/server';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import { cookies } from 'next/headers';
import { getByLogin } from '@/app/db/getByLogin';

export async function POST(request: Request) {
  try {
    let { username, password } = await request.json();
    username = username.trim();
    password = password.trim();
    if (username === '' || password === '') er(errors.input);
    const user = await getByLogin(username);
    if (!user) er(errors.login);
    const isPasswordCorrect = await bcrypt.compare(password, user?.senha);
    if (!isPasswordCorrect) er(errors.login);
    const cookie = cookies();
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    cookie.set('jwt', token, { sameSite: 'none', secure: true });
    return NextResponse.json({ message: 'success' });
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
