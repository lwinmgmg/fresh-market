import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "./connect";

interface MarketAttributes {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
  updatedAt: Date;
}

type MarketCreationAttributes = Optional<MarketAttributes, "id" | "name">;

export class Market extends Model<MarketAttributes, MarketCreationAttributes> {}
Market.init(
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
    latitude: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    longitude: {
      allowNull: false,
      type: DataTypes.FLOAT,
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
    tableName: "market",
  },
);
