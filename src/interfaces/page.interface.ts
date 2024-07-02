import { Types } from "mongoose";

export default interface IPage {
  _id?: Types.ObjectId;
  title: string;
  content: string;
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
