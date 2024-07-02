import { Types } from "mongoose";
import Role from "../enum/role";
export default interface IUser {
  _id?: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: Types.ObjectId;
  isApproved: boolean;
  token?: string;
}

