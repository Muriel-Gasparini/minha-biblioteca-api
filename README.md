# Minha Biblioteca API

Este projeto é uma API para gerenciar uma biblioteca pessoal, protegida por autenticação JWT e documentada com Swagger.

## Requisitos

- Node.js v20
- PostgreSQL

## Instalação

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Configure o banco de dados:

   - Crie um banco de dados PostgreSQL.
   - Copie o arquivo `.env.example` e renomeie para `.env`, caso necessário, altere as variáveis de ambiente.

3. Execute as migrações para criar as tabelas no banco de dados:

   ```bash
   yarn migration:up
   ```

## Uso

1. Inicie o servidor:

   ```bash
   yarn start:dev
   ```

2. Acesse a documentação da API no Swagger:

   - Abra o navegador e vá para `http://localhost:3000/docs`.

## Decisões Tecnológicas

- **NestJS**: Escolhido por sua arquitetura modular e suporte para TypeScript, facilitando a escalabilidade e manutenção do projeto.
- **MikroORM**: Utilizado como ORM por sua integração com NestJS e suporte a PostgreSQL, permitindo um mapeamento de objetos para o banco de dados eficiente.
- **JWT (JSON Web Tokens)**: Implementado para autenticação, garantindo que apenas usuários autenticados possam acessar certas rotas.
- **Swagger**: Integrado para fornecer documentação interativa da API, facilitando o entendimento e teste das rotas disponíveis.

## Requisições CRUD Autenticadas

Para realizar requisições CRUD autenticadas, siga os passos abaixo:

1. **Autenticação**:

   - Use a rota `/auth/login` para autenticar um usuário. Envie um POST request com o corpo contendo `email` e `senha`.
   - Exemplo de corpo de requisição:
     ```json
     {
       "email": "exemplo@gmail.com",
       "senha": "123456"
     }
     ```
   - A resposta incluirá um `access_token` que deve ser usado para autenticar requisições subsequentes.

2. **Usar o Token JWT**:
   - Inclua o token JWT no cabeçalho `Authorization` das suas requisições CRUD.
   - Exemplo de cabeçalho:
     ```
     Authorization: Bearer <seu_token_jwt>
     ```
