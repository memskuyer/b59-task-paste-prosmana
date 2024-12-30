"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class myproject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  myproject.init(
    {
      title: DataTypes.STRING,
      startDate: DataTypes.STRING,
      endDate: DataTypes.STRING,
      description: DataTypes.TEXT,
      technology: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "myproject",
    }
  );
  return myproject;
};
