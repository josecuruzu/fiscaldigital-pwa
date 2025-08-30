// server/models/acta.js
module.exports = (sequelize, DataTypes) => {
  const Acta = sequelize.define('Acta', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fiscal_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'fiscales',
        key: 'id',
      },
      allowNull: false,
    },
    mesa_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'mesas',
        key: 'id',
      },
      allowNull: false,
    },
    votos: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    foto_url: {
      type: DataTypes.TEXT,
    },
    latitud: {
      type: DataTypes.DECIMAL(10, 8),
    },
    longitud: {
      type: DataTypes.DECIMAL(11, 8),
    },
    timestamp_local: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    enviado_en: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    sync: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: 'actas',
    timestamps: false,
  });

  return Acta;
};