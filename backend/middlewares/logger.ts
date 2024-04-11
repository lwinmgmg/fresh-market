import { NextFunction, Request, Response } from "express";

export default function LoggerMw(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const reqTime = new Date();
  next();
  const nowTime = new Date();
  console.log(
    reqTime.toUTCString(),
    res.statusCode,
    req.method,
    req.hostname,
    req.path,
    nowTime.getMilliseconds() - reqTime.getMilliseconds() + " ms",
  );
}
