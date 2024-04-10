import { describe, it, expect } from "vitest";
import { Product } from "./product";
import { ProductAttribute } from "./product-attribute";
import { ProductLine } from "./product-line";
import { sequelize } from "./connect";
import { ProductLineValue } from "./product-line-value";
import { ProductAttributeValue } from "./product-attribute-value";
import { ProductVariantValue } from "./product-variant-value";
import { ProductVariant } from "./product-variant";

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
    const pvlDataList = [
      {
        productLineId: productLine.dataValues.id,
        productAttributeValueId: pav.dataValues.id,
      },
      {
        productLineId: productLine.dataValues.id,
        productAttributeValueId: pav1.dataValues.id,
      },
    ];
    const plvs = await ProductLineValue.bulkCreate(pvlDataList, {
      transaction,
    });
    for (let i = 0; i < plvs.length; i++) {
      const pv = await ProductVariant.create(
        {
          productId: product.dataValues.id,
        },
        { transaction },
      );
      const data = {
        productLineValueId: plvs[i].dataValues.id,
        productVariantId: pv.dataValues.id,
      };
      // Act
      const res = await ProductVariantValue.create(data, { transaction });
      const expectedRes = await ProductVariantValue.findOne({
        transaction,
        where: {
          id: res.dataValues.id,
        },
      });
      // Assert
      expect(expectedRes.dataValues.id).toBe(res.dataValues.id);
      expect(expectedRes.dataValues.productLineValueId).toBe(
        data.productLineValueId,
      );
      expect(expectedRes.dataValues.productVariantId).toBe(
        data.productVariantId,
      );
    }
    await transaction.rollback();
  });
});
