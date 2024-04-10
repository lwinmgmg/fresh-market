"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // Market Table
      await queryInterface.createTable(
        "market",
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
          transaction,
        },
      );
      // Product Table
      await queryInterface.createTable(
        "product",
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
          transaction,
        },
      );
      // Product Variant Table
      await queryInterface.createTable(
        "product_variant",
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
          transaction,
        },
      );
      // Variant Market Table
      await queryInterface.createTable(
        "market_variant",
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
          transaction,
        },
      );
      await transaction.commit();
    } catch (e) {
      console.log(`ERROR ON user migration : ${e}`);
      await transaction.rollback();
    }
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropAllTables();
  },
};
