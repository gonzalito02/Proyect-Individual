const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('type', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      // hacer un SET que reciba el ID y le agregue la palabra DB
      // hacer un GET que, al solicitarlo, envie el ID completo, con DB
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    // timestamps: false,
    // createdAt: false,
    // updatedAt: false,
  });
};
