<p align="center">
  <h2 align="center">
    :closed_lock_with_key: DrivenPass API
  </h2>
</p>

## Usage

```bash
$ git clone https://github.com/ACFernanda/drivenpass-api
$ cd drivenpass-api
$ npm install
$ npm run start
```

API:

```
-- Rotas de autenticação --

• POST /sign-up
    - Rota para cadastrar um novo usuário
    - headers: {}
    - body: {
        "email": "email@email.com",
        "password": "senha" (mínimo de 10 caracteres)
      }

• POST /sign-in
    - Rota para fazer login
    - headers: {}
    - body: {
        "email": "email@email.com",
        "password": "senha"
      }


-- Rotas de cartões --

• POST /cards
    - Rota para registrar um novo cartão
    - headers: { "Authorization": `Bearer ${token}` }
    - body: {
        "title": "título",
        "number": "1234123412341234",
        "name": "nome",
        "securityCode": "123",
        "expirationDate": "MM/YY",
        "password": "1234",
        "isVirtual": true | false,
        "type": "credit" | "debit" | "credit_debit"
      }

• GET /cards (opção: `/cards?id=${cardId}`)
    - Rota para buscar cartão do usuário (todos ou um)
    - headers: { "Authorization": `Bearer ${token}` }
    - body: {}

• DELETE /cards/:id
    - Rota para deletar um cartão
    - headers: { "Authorization": `Bearer ${token}` }
    - body: {}


-- Rotas de credenciais --

• POST /credentials
    - Rota para registrar nova credencial
    - headers: { "Authorization": `Bearer ${token}` }
    - body: {
        "title": "título",
        "url": "http://www.url.com",
        "user": "username",
        "password": "senha"
      }

• GET /credentials (opção: `/credentials?id=${credentialId}`)
    - Rota para buscar credenciais do usuário (todas ou uma)
    - headers: { "Authorization": `Bearer ${token}` }
    - body: {}

• DELETE /credentials/:id
    - Rota para deletar uma credencial
    - headers: { "Authorization": `Bearer ${token}` }
    - body: {}


-- Rotas de notas --

• POST /notes
    - Rota para registrar nova nota
    - headers: { "Authorization": `Bearer ${token}` }
    - body: {
        "title": "título",
        "note": "nota"
      }

• GET /notes (opção: `/notes?id=${noteId}`)
    - Rota para buscar notas do usuário (todas ou uma)
    - headers: { "Authorization": `Bearer ${token}` }
    - body: {}

• DELETE /notes/:id
    - Rota para deletar uma nota
    - headers: { "Authorization": `Bearer ${token}` }
    - body: {}


-- Rotas de wifi --

• POST /wifi
    - Rota para registrar novo wifi
    - headers: { "Authorization": `Bearer ${token}` }
    - body: {
        "title": "título",
        "name": "nome",
        "password": "senha"
      }

• GET /wifi (opção: `/wifi?id=${wifiId}`)
    - Rota para buscar wifis do usuário (todos ou um)
    - headers: { "Authorization": `Bearer ${token}` }
    - body: {}

• DELETE /wifi/:id
    - Rota para deletar um wifi
    - headers: { "Authorization": `Bearer ${token}` }
    - body: {}

```
