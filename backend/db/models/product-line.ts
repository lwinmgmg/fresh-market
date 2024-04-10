import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "./connect";

interface ProductLineAttributes {
  id: number;
  productId: number;
  productAttributeId: number;
  createdAt: Date;
  updatedAt: Date;
}

type ProductLineCreationAttributes = Optional<ProductLineAttributes, "id">;

export class ProductLine extends Model<
  ProductLineAttributes,
  ProductLineCreationAttributes
> {}
ProductLine.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    productId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "product",
        key: "id",
      },
    },
    productAttributeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "product_attribute",
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
    tableName: "product_line",
  },
);
