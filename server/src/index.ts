require("dotenv").config();
import express, { Application } from "express";
import cookieParser from "cookie-parser";
import expressPlayground from "graphql-playground-middleware-express";
//import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql";
import { connectDatabase } from "./database/";

//const app = express();
const PORT = process.env.PORT || 5000;

const mount = async (app: Application) => {
  const db = await connectDatabase();

  //app.use(cors());
  app.use(cookieParser(process.env.SECRET));
  app.use(express.json());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ db, req, res }),
  });
  server.applyMiddleware({
    app,
    path: "/api",
    cors: { origin: `${process.env.PUBLIC_URL}`, credentials: true },
  });

  app.get(
    "/playground",
    expressPlayground({
      endpoint: "/api",
      subscriptionEndpoint: `ws://localhost${server.graphqlPath}`,
    })
  );

  app.listen(PORT, () =>
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port: http://localhost:${PORT}`
    )
  );
  //const list = await db.listings.find({}).toArray();
  //console.log(list);
};

mount(express());
