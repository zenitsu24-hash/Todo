import mongoose from "mongoose";

export const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://root:O24012004rathi@cluster0.76ficny.mongodb.net/",
  );
  console.log("database connected");
};
