export interface Error {
  code: number;
  message: string;
}

export class HttpError implements Error {
  code: number;
  message: string;
  constructor(option?: { code?: number; message?: string }) {
    this.code = option?.code || 500;
    this.message = option?.message || "Internal Server Error";
  }
}
