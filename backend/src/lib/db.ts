import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const con = await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("Mongo Connect", con.connection.host);
  } catch (error) {
    console.log(error);
  }
};
