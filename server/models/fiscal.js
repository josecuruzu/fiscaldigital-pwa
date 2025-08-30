// server/models/fiscal.js
module.exports = (sequelize, DataTypes) => {
  const Fiscal = sequelize.define('Fiscal', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    dni: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false,
    },
    partido: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    rol: {
      type: DataTypes.STRING(20),
      defaultValue: 'fiscal',
    },
    verificado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: 'fiscales',
    timestamps: true,
  });

  return Fiscal;
};