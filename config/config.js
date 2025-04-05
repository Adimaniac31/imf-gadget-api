import dotenv from 'dotenv';
dotenv.config();

export default {
  development: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // for Railway SSL support
      }
    },
    logging: false
  }
};



