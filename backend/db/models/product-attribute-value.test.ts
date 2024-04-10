import { describe, it, expect } from "vitest";
import { ProductAttribute } from "./product-attribute";
import { ProductAttributeValue } from "./product-attribute-value";
import { sequelize } from "./connect";

describe("model", () => {
  it("Should run without error for product attribute value", async () => {
    // Arrange
    const transaction = await sequelize.transaction();
    const att = await ProductAttribute.create({
      name: "Test Product Attribute",
    });
    const data = {
      productAttributeId: att.dataValues.id,
      value: "Test Attribute Value",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    // Act
    const res = await ProductAttributeValue.create(data, { transaction });
    const expectedRes = await ProductAttributeValue.findOne({
      transaction,
      where: {
        id: res.dataValues.id,
      },
    });
    // Assert
    expect(expectedRes.dataValues.id).toBe(res.dataValues.id);
    expect(expectedRes.dataValues.value).toBe(data.value);
    expect(expectedRes.dataValues.productAttributeId).toBe(
      data.productAttributeId,
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
