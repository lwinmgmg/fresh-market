import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "./connect";

interface ProductAttributeAttributes {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

type ProductAttributeCreationAttributes = Optional<
  ProductAttributeAttributes,
  "id" | "name"
>;

export class ProductAttribute extends Model<
  ProductAttributeAttributes,
  ProductAttributeCreationAttributes
> {}
ProductAttribute.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
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
    tableName: "product_attribute",
  },
);
