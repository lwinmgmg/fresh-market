import { describe, test, expect } from "vitest";
import request from "supertest";
import app from "../../../index";
import { Product } from "../../../db/models/product";

describe("product_post_api", () => {
  test("Product Create Happy Case", async () => {
    // Arrange
    const path = "/api/rest/products";
    const data = {
      name: "Testing Product",
      description: "Product Description",
    };
    // Act
    const res = await request(app).post(path).send(data);
    const product = await Product.findByPk(res.body.id);
    // Assert
    expect(res.status).toEqual(200);
    expect(res.body.id > 0).toBe(true);
    expect(res.body.name).toBe(product.dataValues.name);
    expect(res.body.description).toBe(product.dataValues.description);
    await product.destroy({
      force: true,
    });
  });
  test("Product Invalid Data Case", async () => {
    // Arrange
    const path = "/api/rest/products";
    // Act
    const res = await request(app).post(path).send({
      abc: "ABC",
      description: "Product Description",
    });
    // Assert
    expect(res.status).toEqual(422);
    expect("message" in res.body).toBe(true);
  });
});

describe("products_get_api", () => {
  test("Product Get Happy Case", async () => {
    // Arrange
    const path = "/api/rest/products";
    await Product.create({
      name: "API Product",
      description: "Api product description",
    });
    // Act
    const res = await request(app).get(path);
    // Assert
    expect(res.status).toEqual(200);
    expect(res.body.count > 0).toBe(true);
    expect(res.body.data.length > 0).toBe(true);
  });
});

describe("product_get_api", () => {
  test("Product Get by id Happy Case", async () => {
    // Arrange
    const product = await Product.create({
      name: "API Product",
      description: "Api product description",
    });
    const path = `/api/rest/products/${product.dataValues.id}`;
    // Act
    const res = await request(app).get(path);
    // Assert
    expect(res.status).toEqual(200);
    expect(res.body.id).toBe(product.dataValues.id);
    expect(res.body.name).toBe(product.dataValues.name);
    expect(res.body.description).toBe(product.dataValues.description);
  });
  test("Product Get by id Not Found Case", async () => {
    // Arrange
    const path = `/api/rest/products/${0}`;
    // Act
    const res = await request(app).get(path);
    // Assert
    expect(res.status).toEqual(404);
  });
  test("Product get by id (not integer) Case", async () => {
    // Arrange
    const path = `/api/rest/products/test`;
    // Act
    const res = await request(app).get(path);
    // Assert
    expect(res.status).toEqual(400);
  });
});

describe("product_put_api", () => {
  test("Product Update Happy Case", async () => {
    // Arrange
    const product = await Product.create({
      name: "API Product",
      description: "Api product description",
    });
    const path = `/api/rest/products/${product.dataValues.id}`;
    // Act
    const newData = {
      name: "New Name",
      description: "New Description"
    }
    const res = await request(app).put(path).send(newData);
    const newProduct = await Product.findByPk(product.dataValues.id);
    // Assert
    expect(res.status).toEqual(200);
    expect(newProduct.dataValues.name).toBe(newData.name);
    expect(newProduct.dataValues.description).toBe(newData.description);
  });
  test("Product Update Only One Field Case", async () => {
    // Arrange
    const data = {
      name: "API Product",
      description: "Api product description",
    }
    const product = await Product.create(data);
    const path = `/api/rest/products/${product.dataValues.id}`;
    const newData = {
      name: "New Name"
    }
    const expectedData = {...data, ...newData};
    // Act
    const res = await request(app).put(path).send(newData);
    const newProduct = await Product.findByPk(product.dataValues.id);
    // Assert
    expect(res.status).toEqual(200);
    expect(newProduct.dataValues.name).toBe(expectedData.name);
    expect(newProduct.dataValues.description).toBe(expectedData.description);
  });
  test("Product Update Not Found Case", async () => {
    // Arrange
    const path = `/api/rest/products/0`;
    // Act
    const newData = {
      name: "New Name",
      description: "New Description"
    }
    const res = await request(app).put(path).send(newData);
    // Assert
    expect(res.status).toEqual(404);
  });
  test("Product Update Not A Number Case", async () => {
    // Arrange
    const path = `/api/rest/products/slug`;
    // Act
    const newData = {
      name: "New Name",
      description: "New Description"
    }
    const res = await request(app).put(path).send(newData);
    // Assert
    expect(res.status).toEqual(400);
  });
  test("Product Update No Related Field Case", async () => {
    // Arrange
    const product = await Product.create({
      name: "API Product",
      description: "Api product description",
    });
    const path = `/api/rest/products/${product.dataValues.id}`;
    // Act
    const newData = {
      name1: "New Name",
      description1: "New Description"
    }
    const res = await request(app).put(path).send(newData);
    // Assert
    expect(res.status).toEqual(422);
  });
});

describe("product_delete_api", ()=>{
  test("Product Delete By Id Happy Case", async ()=>{
    // Arrange
    const product = await Product.create({
      name: "API Product",
      description: "Api product description",
    });
    const path = `/api/rest/products/${product.dataValues.id}`
    // Act
    const res = await request(app).delete(path)
    const expectedProduct = await Product.findByPk(product.dataValues.id)
    // Assert
    expect(expectedProduct).toBe(null);
    expect(res.status).toBe(200);
  })
  test("Product Delete By Id Not Found Case", async ()=>{
    // Arrange
    const path = `/api/rest/products/0`
    // Act
    const res = await request(app).delete(path)
    // Assert
    expect(res.status).toBe(404);
  })
  test("Product Delete By Id NaN Case", async ()=>{
    // Arrange
    const path = `/api/rest/products/test`
    // Act
    const res = await request(app).delete(path)
    // Assert
    expect(res.status).toBe(400);
  })
})
