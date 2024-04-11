import { NextFunction, Request, Response, Router } from "express";
import { Product } from "../../../db/models/product";
import { Parser } from "../../../utils/parser";
import { ValidationError } from "../../../utils/validation-error";
import { HttpError } from "../../../utils/error.type";
import { asyncPanicMw } from "../../../middlewares/internal-server";

export const router = Router();

router.get(
  "/",
  asyncPanicMw(async (request: Request, response: Response) => {
    const records = await Product.findAll({});
    return response.status(200).send({
      count: records.length,
      data: records,
    });
  }),
);

interface ProductCreateIface {
  name: string;
  description: string;
}
class ProductCreateReq
  extends Parser<ProductCreateIface>
  implements ProductCreateIface
{
  name: string;
  description: string;
  constructor(obj: ProductCreateIface) {
    super(obj, ["name", "description"]);
    if (
      !obj.name ||
      obj.description === null ||
      obj.description === undefined
    ) {
      throw new ValidationError({
        message: "Send all required fields [ name, description ]",
      });
    }
  }
}

router.post(
  "/",
  asyncPanicMw(async (request, response) => {
    const nowTime = new Date();
    let data: ProductCreateReq;
    try {
      data = new ProductCreateReq(request.body);
    } catch (err) {
      return response.status(422).send({
        error: 422,
        message: (err as ValidationError).message,
      });
    }
    const res = await Product.create(
      data.toObj({ extras: { createdAt: nowTime, updatedAt: nowTime } }),
    );
    return response.status(200).send(res.dataValues);
  }),
);

interface ProductUpdateIface {
  name?: string;
  description?: string;
}
class ProductUpdateReq
  extends Parser<ProductUpdateIface>
  implements ProductUpdateIface
{
  name?: string;
  description?: string;
  constructor(obj: ProductUpdateIface) {
    super(obj, ["name", "description"]);
    if (!("name" in obj) && !("description" in obj)) {
      throw new ValidationError({
        message: "No valid fields[name, description] found.",
      });
    }
  }
}

router.put(
  "/:slug",
  asyncPanicMw(async (request, response) => {
    const { slug } = request.params;
    const recordId = Number(slug);
    if (Number.isNaN(recordId)){
      throw new HttpError({
        code: 400,
        message: "Unknow Primary Key"
      })
    }
    const nowTime = new Date();
    let data: ProductUpdateReq;
    try {
      data = new ProductUpdateReq(request.body);
    } catch (err) {
      return response.status(422).send({
        error: 422,
        message: (err as ValidationError).message,
      });
    }
    const [count] = await Product.update(
      data.toObj({
        excludeUnset: true,
        extras: {
          updatedAt: nowTime,
        },
      }),
      {
        where: {
          id: recordId,
        },
      },
    );
    if (count === 0) {
      return response.status(404).send({
        code: 404,
        message: `Record ID ${slug} Not Found`,
      });
    }
    return response.status(200).send({
      message: `Successfully Updated [${count}]`,
    });
  }),
);

router.get(
  "/:slug",
  asyncPanicMw(
    async (request: Request, response: Response, next: NextFunction) => {
      const { slug } = request.params;
      const recordId = Number(slug);
      if (Number.isNaN(recordId)) {
        throw new HttpError({
          code: 400,
          message: "Unknow Primary Key"
        });
      }
      const data = await Product.findByPk(recordId);
      if (!data) {
        return response.status(404).send({
          message: "Product Not Found",
        });
      }
      return response.status(200).send(data);
    },
  ),
);

router.delete(
  "/:slug",
  asyncPanicMw(
    async (request: Request, response: Response, next: NextFunction) => {
      const { slug } = request.params;
      const recordId = Number(slug);
      if (Number.isNaN(recordId)) {
        throw new HttpError({
          code: 400,
          message: "Unknow Primary Key"
        });
      }
      const data = await Product.findByPk(recordId);
      if (!data) {
        return response.status(404).send({
          message: "Product Not Found",
        });
      }
      await data.destroy({
        force: true
      })
      return response.status(200).send({
        message: "Successfully Deleted"
      });
    },
  ),
);
