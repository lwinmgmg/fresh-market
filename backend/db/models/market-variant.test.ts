import { describe, it, expect } from "vitest";
import { Product } from "./product";
import { ProductAttribute } from "./product-attribute";
import { ProductLine } from "./product-line";
import { sequelize } from "./connect";
import { ProductVariant } from "./product-variant";
import { MarketVariant } from "./market-variant";
import { Market } from "./market";

describe("model", () => {
  it("Should run without error for market variant", async () => {
    // Arrange
    const transaction = await sequelize.transaction();
    const product = await Product.create(
      {
        name: "Test Product",
        description: "Test Product Description",
      },
      { transaction },
    );
    const pv = await ProductVariant.create(
      {
        productId: product.dataValues.id,
      },
      { transaction },
    );
    const market = await Market.create(
      {
        name: "Test Market",
        latitude: 10,
        longitude: 10,
      },
      { transaction },
    );
    const data = {
      name: "Test ProductLine",
      marketId: market.dataValues.id,
      productVariantId: pv.dataValues.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    // Act
    const res = await MarketVariant.create(data, { transaction });
    const expectedRes = await MarketVariant.findOne({
      transaction,
      where: {
        id: res.dataValues.id,
      },
    });
    // Assert
    expect(expectedRes.dataValues.id).toBe(res.dataValues.id);
    expect(expectedRes.dataValues.marketId).toBe(data.marketId);
    expect(expectedRes.dataValues.productVariantId).toBe(data.productVariantId);
    expect(expectedRes.dataValues.createdAt.toUTCString()).toBe(
      data.createdAt.toUTCString(),
    );
    expect(expectedRes.dataValues.updatedAt.toUTCString()).toBe(
      data.updatedAt.toUTCString(),
    );
    await transaction.rollback();
  });
});
