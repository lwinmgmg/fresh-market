import { describe, it, expect } from "vitest";
import { Product } from "./product";
import { ProductVariant } from "./product-variant";
import { sequelize } from "./connect";

describe("model", () => {
  it("Should run without error for product varient", async () => {
    // Arrange
    const transaction = await sequelize.transaction();
    const product = await Product.create({
        name: "Test Product",
        description: "Test Product Description"
    })
    const productVariantVal = {
      name: "Test ProductVariant",
      productId: product.dataValues.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    // Act
    const res = await ProductVariant.create(productVariantVal, { transaction });
    const expectedRes = await ProductVariant.findOne({
      transaction,
      where: {
        id: res.dataValues.id,
      },
    });
    // Assert
    expect(expectedRes.dataValues.id).toBe(res.dataValues.id);
    expect(expectedRes.dataValues.productId).toBe(productVariantVal.productId);
    expect(expectedRes.dataValues.active).toBe(true);
    expect(expectedRes.dataValues.createdAt.toUTCString()).toBe(productVariantVal.createdAt.toUTCString());
    expect(expectedRes.dataValues.updatedAt.toUTCString()).toBe(productVariantVal.updatedAt.toUTCString());
    await transaction.rollback();
  });
});
