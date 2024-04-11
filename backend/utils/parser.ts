interface Options {
  excludeUnset?: boolean;
  excludeNull?: boolean;
  excludeUndifined?: boolean;
  extras?: any;
}

interface Fields {
  setFields: string[];
  fieldTypes: any;
}

export class Parser<T> {
  protected _fields: Fields;
  constructor(obj: T, fields?: string[]) {
    this._fields = {
      setFields: [],
      fieldTypes: {},
    };
    if (obj) {
      Object.keys(obj).forEach((key) => {
        this._fields.setFields.push(key);
      });
    }
    if (fields) {
      fields.forEach((field) => {
        this[field] = obj[field];
      });
    }
  }
  static fromJson<T>(jsonStr: string): T {
    return new this(JSON.parse(jsonStr)) as T;
  }
  toObj({
    excludeUnset = false,
    excludeNull = false,
    excludeUndifined = false,
    extras,
  }: Options): T {
    let res = {};
    Object.keys(this).forEach((key) => {
      if (key == "_fields") {
        return;
      }
      if (excludeNull && this[key] == null) {
        return;
      }
      if (excludeUnset && !this._fields.setFields.includes(key)) {
        return;
      }
      if (excludeUndifined && this[key] == undefined) {
        return;
      }
      res[key] = this[key];
    });
    if (extras) {
      res = { ...res, ...extras };
    }
    return res as T;
  }
  toJson(options: Options): string {
    return JSON.stringify(this.toObj(options));
  }
}
