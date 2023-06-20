const express = require('express');
const mysql = require('mysql2');
const config = require('./config');

const app = express();
app.use(express.json());

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection(config);

// Verificar a conexão com o banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL.');
  }
});

// Endpoint para criar um cliente
app.post('/api/v1/cliente', (req, res) => {
  const {
    codigo,
    nome
  } = req.body;
  const query = 'INSERT INTO cliente (codigo, nome) VALUES (?, ?)';
  connection.query(query, [codigo, nome], (err, results) => {
    if (err) {
      console.error('Erro ao inserir cliente:', err);
      res.status(500).json({
        error: 'Erro ao inserir cliente'
      });
    } else {
      res.status(201).json({
        codigo,
        nome
      });
    }
  });
});

// Endpoint para obter um cliente pelo código
app.get('/api/v1/cliente/:codigo', (req, res) => {
  const codigo = req.params.codigo;
  const query = 'SELECT * FROM Cliente WHERE codigo = ?';
  connection.query(query, [codigo], (err, results) => {
    if (err) {
      console.error('Erro ao buscar cliente:', err);
      res.status(500).json({
        error: 'Erro ao buscar cliente'
      });
    } else {
      if (results.length > 0) {
        const cliente = results[0];
        res.json(cliente);
      } else {
        res.status(404).json({
          error: 'Cliente não encontrado'
        });
      }
    }
  });
});

// Endpoint para obter todos os clientes com paginação
app.get('/api/v1/cliente', (req, res) => {
  const page = parseInt(req.query.page) || 1; // Página atual (padrão: 1)
  const limit = 10; // Quantidade de resultados por página
  const offset = (page - 1) * limit; // Deslocamento (offset) com base na página atual

  // Consulta para obter clientes com paginação
  const query = 'SELECT * FROM Cliente LIMIT ? OFFSET ?';
  connection.query(query, [limit, offset], (err, results) => {
    if (err) {
      console.error('Erro ao buscar clientes:', err);
      res.status(500).json({ error: 'Erro ao buscar clientes' });
    } else {
      res.json(results);
    }
  });
});

// Endpoint para adicionar um endereço a um cliente
app.post('/api/v1/cliente/:codigo/endereco', (req, res) => {
  const codigo = req.params.codigo;
  const {
    indice,
    logradouro,
    numero,
    complemento,
    cidade,
    estado,
    cep
  } = req.body;
  const query = 'INSERT INTO endereco (codigo_cliente, indice, logradouro, numero, complemento, cidade, estado, cep) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [codigo, indice, logradouro, numero, complemento, cidade, estado, cep], (err, results) => {
    if (err) {
      console.error('Erro ao inserir endereço:', err);
      res.status(500).json({
        error: 'Erro ao inserir endereço'
      });
    } else {
      res.status(201).json({
        codigo,
        indice,
        logradouro,
        numero,
        complemento,
        cidade,
        estado,
        cep
      });
    }
  });
});

// Endpoint para obter um endereço pelo índice de um cliente
app.get('/api/v1/cliente/:codigo/endereco/:indice', (req, res) => {
  const codigo = req.params.codigo;
  const indice = req.params.indice;
  const query = 'SELECT * FROM Endereco WHERE codigo_cliente = ? AND indice = ?';
  connection.query(query, [codigo, indice], (err, results) => {
    if (err) {
      console.error('Erro ao buscar endereço:', err);
      res.status(500).json({
        error: 'Erro ao buscar endereço'
      });
    } else {
      if (results.length > 0) {
        const endereco = results[0];
        res.json(endereco);
      } else {
        res.status(404).json({
          error: 'Endereço não encontrado'
        });
      }
    }
  });
});

// Endpoint para obter todos os endereços de um cliente com paginação
app.get('/api/v1/cliente/:codigo/endereco', (req, res) => {
  const codigo = req.params.codigo;
  const page = parseInt(req.query.page) || 1; // Página atual (padrão: 1)
  const limit = 10; // Quantidade de resultados por página
  const offset = (page - 1) * limit; // Deslocamento (offset) com base na página atual

  // Consulta para obter endereços de um cliente com paginação
  const query = 'SELECT * FROM Endereco WHERE codigo_cliente = ? LIMIT ? OFFSET ?';
  connection.query(query, [codigo, limit, offset], (err, results) => {
    if (err) {
      console.error('Erro ao buscar endereços:', err);
      res.status(500).json({ error: 'Erro ao buscar endereços' });
    } else {
      res.json(results);
    }
  });
});

// Endpoint para obter endereços por cidade com paginação
app.get('/api/v1/endereco', (req, res) => {
  const cidade = req.query.cidade;
  const page = parseInt(req.query.page) || 1; // Página atual (padrão: 1)
  const limit = 10; // Quantidade de resultados por página
  const offset = (page - 1) * limit; // Deslocamento (offset) com base na página atual

  // Consulta para obter endereços por cidade com paginação
  const query = 'SELECT * FROM endereco WHERE cidade = ? LIMIT ? OFFSET ?';
  connection.query(query, [cidade, limit, offset], (err, results) => {
    if (err) {
      console.error('Erro ao buscar endereços por cidade:', err);
      res.status(500).json({ error: 'Erro ao buscar endereços por cidade' });
    } else {
      res.json(results);
    }
  });
});

// Encerra a conexão com o banco de dados ao finalizar a API
process.on('SIGINT', () => {
  connection.end();
  process.exit();
});

// Inicia o servidor da API
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});