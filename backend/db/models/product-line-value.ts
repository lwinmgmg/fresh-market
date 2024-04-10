import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "./connect";

interface ProductLineValueAttributes {
  id: number;
  productLineId: number;
  productAttributeValueId: number;
  createdAt: Date;
  updatedAt: Date;
}

type ProductLineValueCreationAttributes = Optional<
  ProductLineValueAttributes,
  "id"
>;

export class ProductLineValue extends Model<
  ProductLineValueAttributes,
  ProductLineValueCreationAttributes
> {}
ProductLineValue.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    productLineId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "product_line",
        key: "id",
      },
    },
    productAttributeValueId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "product_attribute_value",
        key: "id",
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: "product_line_value",
  },
);
