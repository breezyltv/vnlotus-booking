import {IResolvers} from "apollo-server-express";
import { ObjectId } from "bson";
import { Database, Listing } from "../../../lib/types";


export const listingResolvers: IResolvers = {
    Query: {
        listings: async (_root: undefined, _args: {}, {db}:{db: Database}
            ) : Promise<Listing[]> =>{
            return await db.listings.find({}).toArray();
        } 
    },
    Mutation: {
        deleteListing: async (_root: undefined, {id} : {id: string}, {db}:{db: Database}
            ): Promise<Listing> => {
            
            const deleteHotel = await db.listings.findOneAndDelete({
                _id: new ObjectId(id)
            })
            if(!deleteHotel.value){
                throw new Error("Failed to delete hotel");

            }
            return deleteHotel.value;
        }
    },
    Listing: {
        id:  (listing: Listing) : string => listing._id.toHexString(),
        title: (listing: Listing) : String => listing.title,
    }
};