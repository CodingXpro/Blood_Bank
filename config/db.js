import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected to MongoDB Database ${mongoose.connection.host}`.bgMagenta
        .white
    );
  } catch (err) {
    console.log(`MongoDB Database Error ${err}`.bgRed.white);
  }
};
