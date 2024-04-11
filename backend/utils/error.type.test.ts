import { describe, test, expect } from "vitest";
import { HttpError } from "./error.type";

describe("http_error", ()=>{
    test("No init data in httperror", ()=>{
        // Assign
        const data = {
            code: 100,
            message: "message"
        }
        // Act
        const err = new HttpError(data);
        // Assert
        expect(err.code).toBe(data.code);
        expect(err.message).toBe(data.message);
    })
    test("No init data in httperror", ()=>{
        // Act
        const err = new HttpError();
        // Assert
        expect(err.code).toBe(500);
        expect(err.message).toBe("Internal Server Error");
    })
})
