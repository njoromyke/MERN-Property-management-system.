import mongoose from "mongoose";
import colors from "colors";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGOURI, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(
      `MongoDB connected:  ${conn.connection.host} `.cyan.bold.underline
    );
  } catch (error) {
    console.error(`Error: ${error} `.red.bold);
    process.exit(1);
  }
};
export default connectDB;
