"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // Product Attribute
      await queryInterface.createTable(
        "product_attribute",
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
          transaction,
        },
      );
      // Product Attribute Value
      await queryInterface.createTable(
        "product_attribute_value",
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
          transaction,
        },
      );
      // Product Line
      await queryInterface.createTable(
        "product_line",
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
          transaction,
        },
      );
      // Product Line Value
      await queryInterface.createTable(
        "product_line_value",
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
          transaction,
        },
      );
      // Product Variant Value
      await queryInterface.createTable(
        "product_variant_value",
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
          transaction,
        },
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("product_variant_value");
    await queryInterface.dropTable("product_line_value");
    await queryInterface.dropTable("product_line");
    await queryInterface.dropTable("product_attribute_value");
    await queryInterface.dropTable("product_attribute");
  },
};
