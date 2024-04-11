import { Error } from "./error.type";

export class ValidationError implements Error {
  code: number;
  message: string;
  constructor({ code, message = "" }: { message?: string; code?: number }) {
    this.code = code || 1;
    this.message = "Validation Error : " + message;
  }
}
