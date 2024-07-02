import IArticle from "../interfaces/article.interface";
import { ClientSession, Types } from "mongoose";
import AppError from "../utils/appError";
import StatusConstants from "../constant/status.constant";
import { injectable } from "inversify";
import "../types/req";
import Media from "../model/media.model";
import IMedia from "../interfaces/media.interface";

@injectable()
export default class MediaService {
  constructor() {}
  async createMedia(data: IMedia, session: ClientSession): Promise<IMedia> {
    const media = new Media(data);
    await media.save({session});
    return media;
  }
}
