import { Types } from "mongoose";

export default interface IMedia {
  _id?: Types.ObjectId;
  title: string;
  content: string;
  filename: string|null;
  path: string|null;
  author: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
