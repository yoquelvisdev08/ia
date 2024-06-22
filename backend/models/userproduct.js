'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserProduct.init({
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    image_id: DataTypes.INTEGER,
    generated_image_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserProduct',
  });
  return UserProduct;
};