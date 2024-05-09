const TOKEN_TESTE = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY';

export default DadosTeste = {
  token_teste: TOKEN_TESTE,
  url_base: 'http://localhost:3000/v1',
  header: {
    headers: { token: TOKEN_TESTE, 'Content-Type': 'application/json' },
  },
};
