import IArticle from "../interfaces/article.interface";
import { ClientSession, Types } from "mongoose";
import AppError from "../utils/appError";
import StatusConstants from "../constant/status.constant";
import { injectable } from "inversify";
import "../types/req";
import User from "../model/user.model";
import Article from "../model/article.model";

@injectable()
export class ArticleService {
  constructor() {}

  async createArticle(
    id: Types.ObjectId,
    title: string,
    data: string,
    session: ClientSession
  ): Promise<IArticle> {
    const author = await User.findById(id).session(session);
    if (!author) {
      throw new AppError(
        StatusConstants.NOT_FOUND.body.message,
        StatusConstants.NOT_FOUND.httpStatusCode
      );
    }
    const articleData: IArticle = {
      title: title,
      content: data,
      author: author._id,
    };
    const article = new Article(articleData);
    await article.save();
    return article;
  }

  async updateArticle(
    id: Types.ObjectId,
    articleId: Types.ObjectId,
    session: ClientSession,
    title?: string,
    data?: string
  ): Promise<IArticle> {
    const author = await User.findById(id).session(session);
    if (!author) {
      throw new AppError(
        StatusConstants.NOT_FOUND.body.message,
        StatusConstants.NOT_FOUND.httpStatusCode
      );
    }
    const articleToUpdate = await Article.findById(articleId).session(session);
    if (!articleToUpdate) {
      throw new AppError(
        StatusConstants.NOT_FOUND.body.message,
        StatusConstants.NOT_FOUND.httpStatusCode
      );
    }
    if (articleToUpdate.author !== id) {
      throw new AppError(
        StatusConstants.UNAUTHORIZED.body.message,
        StatusConstants.UNAUTHORIZED.httpStatusCode
      );
    }
    articleToUpdate.title = title ? title : articleToUpdate.title;
    articleToUpdate.content = data ? data : articleToUpdate.content;
    await articleToUpdate.save();
    return articleToUpdate;
  }

  async deleteArticle(
    id: Types.ObjectId,
    articleId: Types.ObjectId,
    session: ClientSession
  ): Promise<string> {
    const author = await User.findById(id).session(session);
    if (!author) {
      throw new AppError(
        StatusConstants.NOT_FOUND.body.message,
        StatusConstants.NOT_FOUND.httpStatusCode
      );
    }
    const articleTodelete = await Article.findById(articleId).session(session);
    if (!articleTodelete) {
      throw new AppError(
        StatusConstants.NOT_FOUND.body.message,
        StatusConstants.NOT_FOUND.httpStatusCode
      );
    }
    if (articleTodelete.author !== id) {
      throw new AppError(
        StatusConstants.UNAUTHORIZED.body.message,
        StatusConstants.UNAUTHORIZED.httpStatusCode
      );
    }
    await Article.findByIdAndDelete(articleTodelete._id);
    return "delete Success";
  }

  async getArticle(
    articleId: Types.ObjectId,
    session: ClientSession
  ): Promise<IArticle> {
    const article = await Article.findById(articleId).session(session);
    if (!article) {
      throw new AppError(
        StatusConstants.NOT_FOUND.body.message,
        StatusConstants.NOT_FOUND.httpStatusCode
      );
    }
    return article;
  }

  async getAllArticle(session: ClientSession): Promise<IArticle[]> {
    const articles = await Article.find({}).session(session);
    if (!articles) {
      throw new AppError(
        StatusConstants.NOT_FOUND.body.message,
        StatusConstants.NOT_FOUND.httpStatusCode
      );
    }

    return articles;
  }
}
