import { NextFunction, Request, Response } from "express";
import { HttpError } from "../utils/error.type";

export function asyncPanicMw(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      if (res.headersSent) {
        return next(err);
      }
      if (err instanceof HttpError){
        res.status(err.code).send({
          message: err.message,
        });
        return
      }
      res.status(500).send({
        message: "Internal Server Error",
      });
    });
  };
}

// export function panicMw(
//   fn: (req: Request, res: Response, next: NextFunction) => void,
// ) {
//   return (req: Request, res: Response, next: NextFunction) => {
//     try {
//       fn(req, res, next);
//     } catch (err) {
//       if (res.headersSent) {
//         return next(err);
//       }
//       res.status(500).send({
//         message: "Internal Server Error",
//       });
//     }
//   };
// }
