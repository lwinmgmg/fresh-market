import { describe, it, expect } from "vitest";
import { Product } from "./product";
import { sequelize } from "./connect";

describe("model", () => {
  it("Should run without error for product", async () => {
    // Arrange
    const transaction = await sequelize.transaction();
    const productVal = {
      name: "Test Product",
      description: "Test Product Description",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    // Act
    const res = await Product.create(productVal, { transaction });
    const expectedRes = await Product.findOne({
      transaction,
      where: {
        id: res.dataValues.id,
      },
    });
    // Assert
    expect(expectedRes.dataValues.id).toBe(res.dataValues.id);
    expect(expectedRes.dataValues.name).toBe(productVal.name);
    expect(expectedRes.dataValues.description).toBe(productVal.description);
    expect(expectedRes.dataValues.createdAt.toUTCString()).toBe(productVal.createdAt.toUTCString());
    expect(expectedRes.dataValues.updatedAt.toUTCString()).toBe(productVal.updatedAt.toUTCString());
    await transaction.rollback();
  });
});
