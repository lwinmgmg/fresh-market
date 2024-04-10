import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "./connect";

interface ProductVariantValueAttributes {
  id: number;
  productLineValueId: number;
  productVariantId: number;
  createdAt: Date;
  updatedAt: Date;
}

type ProductVariantValueCreationAttributes = Optional<
  ProductVariantValueAttributes,
  "id"
>;

export class ProductVariantValue extends Model<
  ProductVariantValueAttributes,
  ProductVariantValueCreationAttributes
> {}
ProductVariantValue.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    productLineValueId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "product_line_value",
        key: "id",
      },
    },
    productVariantId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "product_variant",
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
    tableName: "product_variant_value",
  },
);
