import { describe, test, expect, assert } from "vitest";
import { Parser } from "./parser";
import { ValidationError } from "./validation-error";

interface TestParserIface {
  name?: string;
  age: number;
}
class TestParser extends Parser<TestParserIface> {
  name: string;
  age: number;
  constructor(obj: TestParserIface, throwErr?: boolean) {
    super(obj, ["name", "age"]);
    if (throwErr) {
      throw new ValidationError({});
    }
  }
}

describe("utils", () => {
  test("Default parser test", () => {
    // Arrange
    const parser = new Parser({});
    // Act
    const data = parser.toObj({
      extras: {
        extraField: "Extra",
        extraField1: "Extra1",
      },
    });
    // Assert
    const expectedObj = {
      extraField: "Extra",
      extraField1: "Extra1",
    };
    Object.keys(expectedObj).forEach((key) => {
      expect(expectedObj[key]).toBe(data[key]);
    });
    Object.keys(data).forEach((key) => {
      expect(data[key]).toBe(expectedObj[key]);
    });
  });
  test("Default parser with unknown fields test", () => {
    // Arrange
    const parser = new Parser({
      unknownField1: "uf1",
      unknownField2: "uf2",
    });
    // Act
    const data = parser.toObj({
      extras: {
        extraField: "Extra",
        extraField1: "Extra1",
      },
    });
    // Assert
    const expectedObj = {
      extraField: "Extra",
      extraField1: "Extra1",
    };
    Object.keys(expectedObj).forEach((key) => {
      expect(expectedObj[key]).toBe(data[key]);
    });
    Object.keys(data).forEach((key) => {
      expect(data[key]).toBe(expectedObj[key]);
    });
  });
  test("Inherit Parser Test test", () => {
    // Arrange
    const parser = new TestParser({
      name: "",
      age: 12,
    });
    // Act
    const data = parser.toObj({
      extras: {
        extraField: "Extra",
        extraField1: "Extra1",
      },
    });
    // Assert
    const expectedObj = {
      extraField: "Extra",
      extraField1: "Extra1",
      name: "",
      age: 12,
    };
    Object.keys(expectedObj).forEach((key) => {
      expect(expectedObj[key]).toBe(data[key]);
    });
    Object.keys(data).forEach((key) => {
      expect(data[key]).toBe(expectedObj[key]);
    });
  });
  test("Inherit Parser exclude unset True test", () => {
    // Arrange
    const parser = new TestParser({
      age: 12,
    });
    // Act
    const data = parser.toObj({
      excludeUnset: true,
      extras: {
        extraField: "Extra",
        extraField1: "Extra1",
      },
    });
    // Assert
    const expectedObj = {
      extraField: "Extra",
      extraField1: "Extra1",
      age: 12,
    };
    Object.keys(expectedObj).forEach((key) => {
      expect(expectedObj[key]).toBe(data[key]);
    });
    Object.keys(data).forEach((key) => {
      expect(data[key]).toBe(expectedObj[key]);
    });
  });
  test("Inherit Parser exclude undefined True test", () => {
    // Arrange
    const parser = new TestParser({
      age: 12,
      name: undefined,
    });
    // Act
    const data = parser.toObj({
      excludeUndifined: true,
      extras: {
        extraField: "Extra",
        extraField1: "Extra1",
      },
    });
    // Assert
    const expectedObj = {
      extraField: "Extra",
      extraField1: "Extra1",
      age: 12,
    };
    Object.keys(expectedObj).forEach((key) => {
      expect(expectedObj[key]).toBe(data[key]);
    });
    Object.keys(data).forEach((key) => {
      expect(data[key]).toBe(expectedObj[key]);
    });
  });
  test("Inherit Parser exclude undefined True test", () => {
    // Arrange
    const parser = new TestParser({
      age: 12,
      name: null,
    });
    // Act
    const data = parser.toObj({
      excludeNull: true,
      extras: {
        extraField: "Extra",
        extraField1: "Extra1",
      },
    });
    // Assert
    const expectedObj = {
      extraField: "Extra",
      extraField1: "Extra1",
      age: 12,
    };
    Object.keys(expectedObj).forEach((key) => {
      expect(expectedObj[key]).toBe(data[key]);
    });
    Object.keys(data).forEach((key) => {
      expect(data[key]).toBe(expectedObj[key]);
    });
  });
  test("Inherit Parser toJson test", () => {
    // Arrange
    const parser = new TestParser({
      age: 12,
      name: "Test",
    });
    // Act
    const data = parser.toJson({
      excludeNull: true,
      extras: {
        extraField: "Extra",
        extraField1: "Extra1",
      },
    });
    // Assert
    const expectedObj = JSON.parse(
      JSON.stringify({
        extraField: "Extra",
        extraField1: "Extra1",
        name: "Test",
        age: 12,
      }),
    );
    Object.keys(expectedObj).forEach((key) => {
      let resData = JSON.parse(data);
      expect(expectedObj[key]).toBe(resData[key]);
    });
    const resData = JSON.parse(data);
    Object.keys(resData).forEach((key) => {
      expect(resData[key]).toBe(expectedObj[key]);
    });
  });
  test("Inherit Parser toObj unhappy test", () => {
    // Arrange
    const parser = TestParser.fromJson<TestParser>(
      JSON.stringify({
        age: 12,
        name: null,
      }),
    );
    // Act
    const data = parser.toObj({
      excludeUnset: true,
      extras: {
        extraField: "Extra",
        extraField1: "Extra1",
      },
    });
    // Assert
    const expectedObj = {
      extraField: "Extra",
      extraField1: "Extra1",
      name: null,
      age: 12,
    };
    Object.keys(expectedObj).forEach((key) => {
      expect(expectedObj[key]).toBe(data[key]);
    });
    Object.keys(data).forEach((key) => {
      expect(data[key]).toBe(expectedObj[key]);
    });
    assert.Throw(() => {
      const parser = new TestParser(
        {
          age: 10,
        },
        true,
      );
    });
  });
});
