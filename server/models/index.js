// server/models/index.js
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'fiscaldigital',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASS || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false, // opcional: desactiva logs de SQL
  }
);

// Test de conexión
sequelize.authenticate()
  .then(() => console.log('✅ Conexión a PostgreSQL exitosa'))
  .catch(err => console.error('❌ Error al conectar a PostgreSQL:', err));

// Autocarga de modelos (próximos pasos)
const db = {
  sequelize,
  Sequelize,
  Fiscal: require('./fiscal')(sequelize, Sequelize.DataTypes),
  Mesa: require('./mesa')(sequelize, Sequelize.DataTypes),
  Acta: require('./acta')(sequelize, Sequelize.DataTypes),
};

// Relaciones (opcional)
db.Fiscal.hasMany(db.Acta, { foreignKey: 'fiscal_id' });
db.Mesa.hasMany(db.Acta, { foreignKey: 'mesa_id' });

module.exports = db;