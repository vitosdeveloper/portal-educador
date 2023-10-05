export const er = (err: string) => {
  throw new Error(err);
};

export const errors = {
  input: 'Preencha todos os campos.',
  login: 'Login ou senha incorretos, contate o diretor caso precise de ajuda.',
};
