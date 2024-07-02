import mongoose, { Schema, Document, Types } from "mongoose";

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: [{ module: String, actions: [String] }],
});
const Role = mongoose.model("Role", roleSchema);

export default Role;
