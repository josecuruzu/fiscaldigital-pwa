// server/models/mesa.js
module.exports = (sequelize, DataTypes) => {
  const Mesa = sequelize.define('Mesa', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    numero_mesa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    establecimiento: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING(255),
    },
    seccion: {
      type: DataTypes.STRING(100),
    },
    circuito: {
      type: DataTypes.STRING(100),
    },
    provincia: {
      type: DataTypes.STRING(100),
    },
    latitud: {
      type: DataTypes.DECIMAL(10, 8),
    },
    longitud: {
      type: DataTypes.DECIMAL(11, 8),
    },
    habilitada: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    tableName: 'mesas',
    timestamps: false,
  });

  return Mesa;
};