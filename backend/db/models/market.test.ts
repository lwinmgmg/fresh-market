import { describe, test, it, expect } from "vitest";
import { Market } from "./market";
import { sequelize } from "./connect";

describe("model", () => {
  it("Should run without error for market", async () => {
    // Arrange
    const transaction = await sequelize.transaction();
    const marketVal = {
      name: "Test Market",
      latitude: 10,
      longitude: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    // Act
    const res = await Market.create(marketVal, { transaction });
    const expectedRes = await Market.findOne({
      transaction,
      where: {
        id: res.dataValues.id,
      },
    });
    // Assert
    expect(expectedRes.dataValues.id).toBe(res.dataValues.id);
    expect(expectedRes.dataValues.name).toBe(marketVal.name);
    expect(expectedRes.dataValues.latitude).toBe(marketVal.latitude);
    expect(expectedRes.dataValues.longitude).toBe(marketVal.longitude);
    expect(expectedRes.dataValues.createdAt.toUTCString()).toBe(
      marketVal.createdAt.toUTCString(),
    );
    expect(expectedRes.dataValues.updatedAt.toUTCString()).toBe(
      marketVal.updatedAt.toUTCString(),
    );
    await transaction.rollback();
  });
});
