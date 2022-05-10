const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {this.setDataValue("name", value.toLowerCase())}
    },
    hp: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    attack: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    defense: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    speed: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    height: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      set(value) {this.setDataValue("height", value * 10)}
    },
    weight: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      set(value) {this.setDataValue("weight", value * 10)}
    },
    img: {
      type: DataTypes.STRING,
      defaultValue: "no image"
    },
  }, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
};
