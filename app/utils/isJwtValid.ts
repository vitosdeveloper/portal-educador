import { cookies } from 'next/headers';
import { er } from './errorUtils';
const jwt = require('jsonwebtoken');

export const isJwtValid = () => {
  const cookie = cookies();
  try {
    const cookieJwt = cookie.get('jwt');
    if (!cookieJwt) er('No jwt found.');
    const verified = jwt.verify(cookieJwt?.value, process.env.JWT_SECRET);
    return verified;
  } catch (error) {
    return false;
  }
};
