export const AllTexts = {
  server: {
    serverOn: 'Server On',
    documentationOn: 'Documentation at',
  },

  env: {
    error: {
      validation_failed: 'Erro ao validar variáveis de ambiente',
      missing_variables: 'Variáveis de ambiente ausentes ou inválidas',
    },
    description: {
      database_url: 'URL do banco de dados deve ser uma string válida',
      node_env: 'NODE_ENV deve ser development, production ou test',
      host: 'HOST deve ser uma string válida',
      port: 'PORT deve ser um número válido',
      log_level: 'LOG_LEVEL deve ser um nível de log válido',
      swagger_username: 'SWAGGER_USERNAME deve ser uma string válida',
      swagger_password: 'SWAGGER_PASSWORD deve ser uma string válida',
      jwt_secret: 'JWT_SECRET deve ser uma string válida',
    },
  },

  scalar: {
    error: {
      missing_token: 'Token de autenticação ausente',
      invalid_credentials: 'Credenciais inválidas',
    },
  },

  swagger: {
    title: 'API SaaS Todo List',
    description: 'Documentação completa da API Todo List com autenticação JWT',
    version: '1.0.0',
    auth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Autenticação JWT usando esquema Bearer',
    },
    tags: {
      auth: 'Autenticação de usuários',
      users: 'Gerenciamento de usuários',
      todos: 'Operações com tarefas',
    },
    errors: {
      not_found: 'Documentação não encontrada',
      setup_failed: 'Falha ao configurar documentação Swagger',
    },
  },

  prisma: {
    log: {
      connected: 'Prisma conectado ao banco de dados',
      disconnected: 'Prisma desconectado do banco de dados',
      health_check: 'Health check do banco de dados realizado',
    },
    error: {
      connection_failed: 'Falha ao conectar ao banco de dados',
      disconnection_failed: 'Erro ao desconectar Prisma',
      health_check_failed: 'Health check do banco de dados falhou',
      query_failed: 'Erro ao executar consulta no banco de dados',
    },
  },
} as const;
