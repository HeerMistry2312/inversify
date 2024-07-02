import { injectable, inject } from "inversify";
import {
  BaseMiddleware,
  next,
  request,
  response,
} from "inversify-express-utils";
import AppError from "../utils/appError";
import { Request, Response, NextFunction } from "express";
import "../types/req";
import StatusConstants from "../constant/status.constant";
import Role from "../model/role.model";

@injectable()
export default class RoleMiddleware extends BaseMiddleware {
  async handler(
    @request() req: Request,
    @response() res: Response,
    @next() next: NextFunction
  ): Promise<void> {
    try {
      const role = req.role;
      const { module, action } = req.params;
      if (!role) {
        throw new AppError(
          StatusConstants.NOT_FOUND.body.message,
          StatusConstants.NOT_FOUND.httpStatusCode
        );
      }
      const findRole = await Role.findById(role);
      if (!findRole) {
        throw new AppError(
          StatusConstants.NOT_FOUND.body.message,
          StatusConstants.NOT_FOUND.httpStatusCode
        );
      }
      const permission = findRole.permissions.find(
        (p) => p.module === module && p.actions.includes(action)
      );
      if (!permission) {
        throw new AppError(
          StatusConstants.FORBIDDEN.body.message,
          StatusConstants.FORBIDDEN.httpStatusCode
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}
