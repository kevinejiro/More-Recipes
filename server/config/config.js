module.exports = {
  development: {
    username: 'postgres',
    password: 'kevinejiro',
    database: 'more-recipes',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: 'kevinejiro',
    database: 'more-recipes-test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
};

