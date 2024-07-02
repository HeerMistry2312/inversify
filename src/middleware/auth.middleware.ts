import { injectable, inject } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import AppError from "../utils/appError";
import { Request, Response, NextFunction } from "express";
import "../types/req";
import TokenPayload from "../interfaces/token.interface";
import StatusConstants from "../constant/status.constant";
import jwt, { decode } from "jsonwebtoken";
import { config } from "../config/config";

@injectable()
export default class AuthMiddleware extends BaseMiddleware {
  async handler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      let token = req.cookies.token;
      if (!token) {
        throw new AppError(
          StatusConstants.UNAUTHORIZED.body.message,
          StatusConstants.UNAUTHORIZED.httpStatusCode
        );
      }
      if (!config.secret_key) {
        throw new AppError(
          StatusConstants.NOT_FOUND.body.message,
          StatusConstants.NOT_FOUND.httpStatusCode
        );
      }
      const decodeToken = jwt.verify(token, config.secret_key) as TokenPayload;
      req.id = decodeToken.id;
      req.username = decodeToken.username;
      req.email = decodeToken.email;
      req.role = decodeToken.role;
      next();
    } catch (error) {
      next(error);
    }
  }
}
