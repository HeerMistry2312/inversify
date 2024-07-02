import { Types } from "mongoose";

export default interface TokenPayload {
    id?: Types.ObjectId;
    username?: string;
    email?: string;
    role?: Types.ObjectId;
  }
