import mongoose from "mongoose";

const signInModel = new mongoose.Schema<SchemaStruct>({
  fullName: {
    type: String,
    required: false,
    unique: false,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    unique: false,
  },
  picture: {
    type: String,
    require: false,
    unique: true,
  },
  googleId: {
    type: String,
    require: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

export interface SchemaStruct {
  id?: string;
  fullName?: string;
  email: string;
  password: string;
  picture: string;
  googleId: string;
  createdAt: Date;
  updatedAt: Date;
}
export const User = mongoose.model<SchemaStruct>("user", signInModel);
