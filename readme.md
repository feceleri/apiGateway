
# Trabalho APi Gateway & Integration

# API de Gerenciamento de Clientes e Endereços

Esta é uma API em Node.js para gerenciar clientes e endereços. Ela permite adicionar, obter e buscar informações relacionadas a clientes e seus respectivos endereços. A API utiliza um banco de dados MySQL para armazenar os dados.

## Funcionalidades

A API possui as seguintes funcionalidades:

- Adicionar Cliente: Permite adicionar um novo cliente ao sistema.
- Obter Cliente: Permite obter informações de um cliente específico com base no código.
- Listar Clientes: Permite obter a lista de todos os clientes cadastrados no sistema.
- Adicionar Endereço: Permite adicionar um novo endereço a um cliente específico.
- Obter Endereço: Permite obter informações de um endereço específico de um cliente.
- Listar Endereços: Permite obter a lista de todos os endereços associados a um cliente.
- Buscar Endereços por Cidade: Permite buscar todos os endereços de clientes com base em uma cidade específica.

## Rotas da API

A API possui as seguintes rotas:

- `POST /api/v1/cliente`: Adicionar um novo cliente.
- `GET /api/v1/cliente/{codigo}`: Obter informações de um cliente específico.
- `GET /api/v1/cliente/`: Listar todos os clientes.
- `POST /api/v1/cliente/{codigo}/endereco`: Adicionar um novo endereço a um cliente.
- `GET /api/v1/cliente/{codigo}/endereco/{indice}`: Obter informações de um endereço específico de um cliente.
- `GET /api/v1/cliente/{codigo}/endereco/`: Listar todos os endereços de um cliente.
- `GET /api/v1/cliente/endereco?cidade={cidade}`: Buscar endereços de clientes por cidade.

## Paginação

A listagem de clientes e endereços possui suporte à paginação. Por padrão, são exibidos 10 registros por página. É possível especificar a página desejada adicionando o parâmetro `page` nas rotas que retornam listas.

## Configuração do Banco de Dados

A API utiliza um banco de dados MySQL para armazenar os dados dos clientes e endereços. É necessário configurar as informações de conexão com o banco de dados no arquivo `config.js`.

## Executando a API

Para executar a API, siga as etapas abaixo:

1. Instale as dependências do projeto usando o comando: `npm install`.
2. Configure as informações de conexão com o banco de dados no arquivo `config.js`.
3. Inicie o servidor com o comando: `npm start`.
4. A API estará disponível no endereço `http://localhost:3000`.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir problemas (issues) e enviar solicitações de pull requests para melhorar a API.

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).
