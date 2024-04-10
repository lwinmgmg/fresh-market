import { describe, it, expect } from "vitest";
import { Product } from "./product";
import { ProductAttribute } from "./product-attribute";
import { ProductLine } from "./product-line";
import { sequelize } from "./connect";
import { ProductLineValue } from "./product-line-value";
import { ProductAttributeValue } from "./product-attribute-value";

describe("model", () => {
  it("Should run without error for product line value", async () => {
    // Arrange
    const transaction = await sequelize.transaction();
    const product = await Product.create(
      {
        name: "Test Product",
        description: "Test Product Description",
      },
      { transaction },
    );
    const att = await ProductAttribute.create(
      {
        name: "Test Attribute",
      },
      { transaction },
    );
    const productLine = await ProductLine.create(
      {
        productId: product.dataValues.id,
        productAttributeId: att.dataValues.id,
      },
      { transaction },
    );
    const pav = await ProductAttributeValue.create(
      {
        productAttributeId: att.dataValues.id,
        value: "Test Value",
      },
      { transaction },
    );
    const pav1 = await ProductAttributeValue.create(
      {
        productAttributeId: att.dataValues.id,
        value: "Test Value 1",
      },
      { transaction },
    );
    const data = {
      productLineId: productLine.dataValues.id,
      productAttributeValueId: pav.dataValues.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const data2 = {
      productLineId: productLine.dataValues.id,
      productAttributeValueId: pav1.dataValues.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    // Act
    const res = await ProductLineValue.create(data, { transaction });
    await ProductLineValue.create(data2, { transaction });
    const expectedRes = await ProductLineValue.findOne({
      transaction,
      where: {
        id: res.dataValues.id,
      },
    });
    // Assert
    expect(expectedRes.dataValues.id).toBe(res.dataValues.id);
    expect(expectedRes.dataValues.productLineId).toBe(data.productLineId);
    expect(expectedRes.dataValues.productAttributeValueId).toBe(
      data.productAttributeValueId,
    );
    expect(expectedRes.dataValues.createdAt.toUTCString()).toBe(
      data.createdAt.toUTCString(),
    );
    expect(expectedRes.dataValues.updatedAt.toUTCString()).toBe(
      data.updatedAt.toUTCString(),
    );
    await transaction.rollback();
  });
});
