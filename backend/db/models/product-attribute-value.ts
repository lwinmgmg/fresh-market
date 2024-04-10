import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "./connect";

interface ProductAttributeValueAttributes {
  id: number;
  productAttributeId: number;
  value: string;
  createdAt: Date;
  updatedAt: Date;
}

type ProductAttributeValueCreationAttributes = Optional<
  ProductAttributeValueAttributes,
  "id" | "value"
>;

export class ProductAttributeValue extends Model<
  ProductAttributeValueAttributes,
  ProductAttributeValueCreationAttributes
> {}
ProductAttributeValue.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    productAttributeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "product_attribute",
        key: "id",
      },
    },
    value: {
      allowNull: false,
      type: DataTypes.STRING,
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
    tableName: "product_attribute_value",
  },
);
