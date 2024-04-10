import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "./connect";

interface MarketVariantAttributes {
  id: number;
  marketId: number;
  productVariantId: number;
  price: number;
  soldQty: number;
  avaQty: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

type MarketVariantCreationAttributes = Optional<
  MarketVariantAttributes,
  "id" | "price"
>;

export class MarketVariant extends Model<
  MarketVariantAttributes,
  MarketVariantCreationAttributes
> {}
MarketVariant.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    marketId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "market",
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
    price: {
      allowNull: false,
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    soldQty: {
      allowNull: false,
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    avaQty: {
      allowNull: false,
      type: DataTypes.FLOAT,
      defaultValue: 0,
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
    tableName: "market_variant",
  },
);
