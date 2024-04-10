import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "./connect";

interface ProductAttributes {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

type ProductCreationAttributes = Optional<ProductAttributes, "id" | "name">;

export class Product extends Model<
  ProductAttributes,
  ProductCreationAttributes
> {}
Product.init(
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
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
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
    tableName: "product",
  },
);
