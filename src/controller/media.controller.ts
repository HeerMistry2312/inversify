import { injectable, inject } from "inversify";
import { NextFunction, Request, Response } from "express";
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  next,
  request,
  requestParam,
  response,
} from "inversify-express-utils";
import mongoose, { Types } from "mongoose";
import { TYPES } from "../types/types";
import StatusCode from "../enum/statusCode";
import MediaService from "../services/media.service";
import upload from "../utils/imageUpload";
import AppError from "../utils/appError";
import StatusConstants from "../constant/status.constant";

@controller("/media", TYPES.AuthMiddleware)
export class MediaController {
  constructor(@inject(TYPES.MediaService) private mediaService: MediaService) {}

  @httpPost("/:module/:action", TYPES.RoleMiddleware, upload.array("files"))
  public async createMedia(
    @requestParam("module") module: string,
    @requestParam("action") action: string,
    @request() req: Request,
    @response() res: Response,
    @next() next: NextFunction
  ): Promise<void> {
    const session = await mongoose.startSession();
    await session.startTransaction();
    try {
      const author = new Types.ObjectId(req.id);
      const { title, content } = req.body;
      const filename = req.file!.filename;
      const path = req.file!.path;
      const newMedia = await this.mediaService.createMedia(
        { title, content, filename, path, author },
        session
      );
      await session.commitTransaction()
      await session.endSession()
      res.status(StatusCode.OK).send(newMedia)
    } catch (error) {
      next(error)
    }

  }
}
