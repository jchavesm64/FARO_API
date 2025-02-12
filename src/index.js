import mongoose from "mongoose";
import { app, server } from "./app";

const PORT = process.env.PORT || 4000;

export const connect = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: "dev",
  });
};

export const disconnectDatabase = async () => {
  await mongoose.connection.close();
};

if (process.env.NODE_ENV !== "test") {
  connect()
    .then(() => {
      console.log("Database connected");
      app.listen(PORT, () => {
        console.log(
          `Server is Running on http://localhost:${PORT}${server.graphqlPath}`
        );
      });
    })
    .catch((error) => {
      console.error("Database connection error:", error);
    });
}

export { app, server };
