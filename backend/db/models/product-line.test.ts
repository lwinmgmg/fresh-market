import { describe, it, expect } from "vitest";
import { Product } from "./product";
import { ProductAttribute } from "./product-attribute";
import { ProductLine } from "./product-line";
import { sequelize } from "./connect";

describe("model", () => {
  it("Should run without error for product line", async () => {
    // Arrange
    const transaction = await sequelize.transaction();
    const product = await Product.create({
        name: "Test Product",
        description: "Test Product Description"
    })
    const att = await ProductAttribute.create({
        name: "Test Attribute"
    })
    const data = {
      name: "Test ProductLine",
      productId: product.dataValues.id,
      productAttributeId: att.dataValues.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    // Act
    const res = await ProductLine.create(data, { transaction });
    const expectedRes = await ProductLine.findOne({
      transaction,
      where: {
        id: res.dataValues.id,
      },
    });
    // Assert
    expect(expectedRes.dataValues.id).toBe(res.dataValues.id);
    expect(expectedRes.dataValues.productId).toBe(data.productId);
    expect(expectedRes.dataValues.productAttributeId).toBe(data.productAttributeId);
    expect(expectedRes.dataValues.createdAt.toUTCString()).toBe(data.createdAt.toUTCString());
    expect(expectedRes.dataValues.updatedAt.toUTCString()).toBe(data.updatedAt.toUTCString());
    await transaction.rollback();
  });
});
