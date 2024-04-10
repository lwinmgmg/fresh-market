import { describe, it, expect } from "vitest";
import { ProductAttribute } from "./product-attribute";
import { sequelize } from "./connect";

describe("model", () => {
  it("Should run without error for product attribute", async () => {
    // Arrange
    const transaction = await sequelize.transaction();
    const data = {
      name: "Test Product Attribute",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    // Act
    const res = await ProductAttribute.create(data, { transaction });
    const expectedRes = await ProductAttribute.findOne({
      transaction,
      where: {
        id: res.dataValues.id,
      },
    });
    // Assert
    expect(expectedRes.dataValues.id).toBe(res.dataValues.id);
    expect(expectedRes.dataValues.name).toBe(data.name);
    expect(expectedRes.dataValues.createdAt.toUTCString()).toBe(
      data.createdAt.toUTCString(),
    );
    expect(expectedRes.dataValues.updatedAt.toUTCString()).toBe(
      data.updatedAt.toUTCString(),
    );
    await transaction.rollback();
  });
});
