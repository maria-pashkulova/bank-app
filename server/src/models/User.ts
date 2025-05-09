import mongoose, { Schema, Document, Model } from "mongoose";
import { createError } from "../utils/customErrorUtils";

// Define the TypeScript interface for the User document
export interface IUser extends Document {
  pid: string;
  idNum?: string; // Optional field
  cyrillicName: string;
  latinName: string;
  email: string;
  phone: string;
  address: string;
  username: string;
  password: string;
}

// Define the schema for the User model
const userSchema: Schema<IUser> = new Schema(
  {
    pid: {
      type: String,
      required: true,
    },
    idNum: {
      type: String,
      required: false, // Optional field
    },
    cyrillicName: {
      type: String,
      required: true,
    },
    latinName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//Duplicate usernames - uniqueness constraint is handled by Mongo DB server
//Custom error message for uniqueness constraint violation in MongoDB
userSchema.post(
  "save",
  function (error: any, _doc: IUser, next: (err?: Error) => void) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      const customError = createError(
        "В системата вече съществува потребител с това потребителско име!",
        409
      );
      customError.name = "ValidationError";
      next(customError);
    } else {
      next(error);
    }
  }
);

// Create model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
