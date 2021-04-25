require("dotenv").config();
import express, {Application} from "express";
import cors from "cors"
import {ApolloServer} from "apollo-server-express";
import {typeDefs, resolvers} from "./graphql"; 
import {connectDatabase} from "./database/";

//const app = express();
//const PORT = process.env.PORT || 8080;



const mount = async (app : Application) =>{
    const db = await connectDatabase();
    const server = new ApolloServer({typeDefs, resolvers, context: () =>({db})});
    server.applyMiddleware({app, path: "/api"})
    
    app.use(cors());
    app.use(express.json());
    
    app.listen(process.env.PORT,() => console.log(`Server started on: http://localhost:${process.env.PORT}`));
    //const list = await db.listings.find({}).toArray();
    //console.log(list);
    
};

mount(express());