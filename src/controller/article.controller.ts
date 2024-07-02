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
import { UserService } from "../services/user.service";
import { TYPES } from "../types/types";
import StatusCode from "../enum/statusCode";
import { ArticleService } from "../services/article.service";

@controller("/article", TYPES.AuthMiddleware)
export class ArticleController {
  constructor(
    @inject(TYPES.ArticleService) private articleService: ArticleService
  ) {}
  @httpPost("/:module/:action", TYPES.RoleMiddleware)
  public async createArticle(
    @requestParam("module") module: string,
    @requestParam("action") action: string,
    @request() req: Request,
    @response() res: Response,
    @next() next: NextFunction
  ): Promise<void> {
    const session = await mongoose.startSession();
    await session.startTransaction();
    try {
      const { title, content } = req.body;
      const article = await this.articleService.createArticle(
        req.id!,
        title,
        content,
        session
      );
      await session.commitTransaction();
      await session.endSession();
      res.status(StatusCode.OK).send(article);
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      next(error);
    }
  }

  @httpPut("/:module/:action/:id", TYPES.RoleMiddleware)
  public async updateArticle(
    @requestParam("module") module: string,
    @requestParam("action") action: string,
    @request() req: Request,
    @response() res: Response,
    @next() next: NextFunction
  ): Promise<void> {
    const session = await mongoose.startSession();
    await session.startTransaction();
    try {
      const articleId = new Types.ObjectId(req.params.id);
      const { title, content } = req.body;
      const article = await this.articleService.updateArticle(
        req.id!,
        articleId,
        session,
        title,
        content
      );
      await session.commitTransaction();
      await session.endSession();
      res.status(StatusCode.OK).send(article);
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      next(error);
    }
  }


  @httpDelete("/:module/:action/:id", TYPES.RoleMiddleware)
  public async deleteArticle(
    @requestParam("module") module: string,
    @requestParam("action") action: string,
    @request() req: Request,
    @response() res: Response,
    @next() next: NextFunction
  ): Promise<void> {
    const session = await mongoose.startSession();
    await session.startTransaction();
    try {
      const articleId = new Types.ObjectId(req.params.id);
      const article = await this.articleService.deleteArticle(
        req.id!,
        articleId,
        session
      );
      await session.commitTransaction();
      await session.endSession();
      res.status(StatusCode.OK).send(article);
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      next(error);
    }
  }

  @httpGet("/:module/:action/:id", TYPES.RoleMiddleware)
  public async getArticle(
    @requestParam("module") module: string,
    @requestParam("action") action: string,
    @request() req: Request,
    @response() res: Response,
    @next() next: NextFunction
  ): Promise<void> {
    const session = await mongoose.startSession();
    await session.startTransaction();
    try {
      const articleId = new Types.ObjectId(req.params.id);
      const article = await this.articleService.getArticle(
        articleId,
        session
      );
      await session.commitTransaction();
      await session.endSession();
      res.status(StatusCode.OK).send(article);
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      next(error);
    }
  }

  @httpGet("/:module/:action", TYPES.RoleMiddleware)
  public async getAllArticles(
    @requestParam("module") module: string,
    @requestParam("action") action: string,
    @request() req: Request,
    @response() res: Response,
    @next() next: NextFunction
  ): Promise<void> {
    const session = await mongoose.startSession();
    await session.startTransaction();
    try {
      const article = await this.articleService.getAllArticle(
        session
      );
      await session.commitTransaction();
      await session.endSession();
      res.status(StatusCode.OK).send(article);
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      next(error);
    }
  }
}
