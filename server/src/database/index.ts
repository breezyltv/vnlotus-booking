import { MongoClient } from "mongodb";
import { Database, User, Room, Booking, Profile } from "../lib/types";

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db("vnlotus-dev-db");
  return {
    bookings: db.collection<Booking>("bookings"),
    rooms: db.collection<Room>("rooms"),
    users: db.collection<User>("users"),
    profile: db.collection<Profile>("profile"),
  };
};
