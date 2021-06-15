import { IResolvers } from "apollo-server-express";
import { Request } from "express";
import { ObjectId } from "bson";
import { Database, Room, User } from "../../../lib/types";
import { authorizeAccessToken } from "../../../lib/auth";
import {
  RoomArgs,
  RoomBookingArgs,
  RoomBookingData,
  RoomsByLocationArgs,
  RoomsData,
  RoomsQuery,
  RoomsFilter,
  IRoomHostInfo,
} from "./types";
import { logger } from "../../../lib/utils";
export const roomResolvers: IResolvers = {
  Query: {
    room: async (
      _root: undefined,
      { id }: RoomArgs,
      { db }: { db: Database }
    ): Promise<Room> => {
      try {
        logger("[room] id", id);
        const room = await db.rooms.findOne({ _id: new ObjectId(id) });
        if (!room) {
          throw new Error("No room be found!");
        }
        // check if request is authorized
        // const viewer = await authorizeAccessToken(db, req);
        // if (viewer && viewer._id.toHexString() === room.host) {
        //   room.authorized = true;
        // }
        return room;
      } catch (error) {
        throw new Error(`Failed to get the room: ${error}`);
      }
    },
  },
  Mutation: {
    deleteListing: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Room> => {
      const deleteHotel = await db.rooms.findOneAndDelete({
        _id: new ObjectId(id),
      });
      if (!deleteHotel.value) {
        throw new Error("Failed to delete hotel");
      }
      return deleteHotel.value;
    },
  },

  Room: {
    _id: (room: Room): string => {
      return room._id.toString();
    },
    host: async (
      room: Room,
      _args: {},
      { db }: { db: Database }
    ): Promise<IRoomHostInfo> => {
      try {
        const host = await db.users.findOne({ _id: new ObjectId(room.host) });
        if (!host) {
          throw new Error("Host could not be found!");
        }
        const displayName = host.displayName
          ? host.displayName
          : host.first_name + " " + host.last_name;
        const hostData = {
          _id: host._id.toHexString(),
          displayName,
          email: host.email,
          avatar: host.avatar ? host.avatar : null,
          phone: host.phone ? host.phone : null,
        };
        return hostData;
      } catch (error) {
        throw new Error(`Failed to get the host: ${error}`);
      }
    },
    bookingsIndex: (room: Room): string => {
      return JSON.stringify(room.bookingsIndex);
    },
    bookings: async (
      room: Room,
      { limit, page }: RoomBookingArgs,
      { db }: { db: Database }
    ): Promise<RoomBookingData | null> => {
      try {
        if (!room.authorized) {
          return null;
        }
        const data: RoomBookingData = {
          total: 0,
          result: [],
        };
        let cursor = await db.bookings.find({
          _id: { $in: room.bookings },
        });
        //Example : page = 1; limit = 10, cursor starts at 0
        //Example : page = 2; limit = 10, cursor starts at 10
        cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);
        data.total = await cursor.count();
        data.result = await cursor.toArray();
        return data;
      } catch (error) {
        throw new Error(`Failed to query bookings: ${error}`);
      }
    },
  },
  //   roomsByLocation: async (
  //     _root: undefined,
  //     { location, filter, limit, page }: RoomsByLocationArgs,
  //     { db }: { db: Database }
  //   ): Promise<RoomsData> => {
  //     try {
  //       const query: RoomsQuery = {};
  //       const data: RoomsData = {
  //         region: null,
  //         total: 0,
  //         result: [],
  //       };

  //       if (location) {
  //         const { country, admin, city } = await Google.geocode(location);
  //         if (city) query.city = city;
  //         if (admin) query.admin = admin;
  //         if (country) {
  //           query.country = country;
  //         } else {
  //           throw new Error('[App] No country found!');
  //         }

  //         const cityText = city ? `${city}, ` : '';
  //         const adminText = admin ? `${admin}, ` : '';
  //         data.region = `${cityText}${adminText}${country}`;
  //       }

  //       let cursor = await db.rooms.find(query);

  //       if (filter && filter === RoomsFilter.PRICE_LOW_TO_HIGH) {
  //         cursor = cursor.sort({ price: 1 });
  //       }

  //       if (filter && filter === RoomsFilter.PRICE_HIGH_TO_LOW) {
  //         cursor = cursor.sort({ price: -1 });
  //       }
  //       cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
  //       cursor = cursor.limit(limit);

  //       data.total = await cursor.count();
  //       data.result = await cursor.toArray();

  //       return data;
  //     } catch (error) {
  //       throw new Error(`[APP]: Failed to query listings: ${error}`);
  //     }
  //   },
};
