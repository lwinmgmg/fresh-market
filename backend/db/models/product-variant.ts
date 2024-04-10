import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "./connect";

interface ProductVariantAttributes {
  id: number;
  productId: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

type ProductVariantCreationAttributes = Optional<
  ProductVariantAttributes,
  "id"
>;

export class ProductVariant extends Model<
  ProductVariantAttributes,
  ProductVariantCreationAttributes
> {}
ProductVariant.init(
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
    active: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
    tableName: "product_variant",
  },
);
