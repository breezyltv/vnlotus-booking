require("dotenv").config();
import { ObjectId} from "mongodb";
import { connectDatabase} from "../src/database";
import {Listing} from "../src/lib/types";

const seed = async () => {
    try {
        console.log("[seed]: running...");
        const db = await connectDatabase();
        const mockData: Listing[] = [
            {
                _id: new ObjectId(),
                title: "Paradise Point Resort",
                image: "https://media-cdn.tripadvisor.com/media/photo-o/07/18/91/93/paradise-point-resort.jpg",
                address: "1404 Vacation Road, Mission Bay, San Diego, CA 92109, USA",
                price: 1000,
                numOfGuests: 2,
                numOfBeds: 2,
                numOfBaths: 2,
                rating: 3
            },
            {
                _id: new ObjectId(),
                title: "Manchester Grand Hyatt San Diego",
                image: "https://media-cdn.tripadvisor.com/media/photo-o/0a/1b/25/38/top-of-the-hyatt-sky.jpg",
                address: "One Market Place, Downtown San Diego, San Diego, CA 92101, USA",
                price: 1500,
                numOfGuests: 2,
                numOfBeds: 2,
                numOfBaths: 2,
                rating: 3
            },
            {
                _id: new ObjectId(),
                title: "Hilton San Diego Bayfront",
                image: "https://media-cdn.tripadvisor.com/media/photo-o/11/f1/23/66/hilton-san-diego-bayfront.jpg",
                address: "1 Park Boulevard, San Diego, 92101, USA",
                price: 2500,
                numOfGuests: 2,
                numOfBeds: 2,
                numOfBaths: 2,
                rating: 4
            },
            {
                _id: new ObjectId(),
                title: "Cham Oasis Nha Trang Resort Condotel",
                image: "https://images.trvl-media.com/hotels/17000000/16520000/16518000/16517903/e46fb7e2.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
                address: "304, 2/4 Street, Vinh Phuoc, Nha Trang",
                price: 2500,
                numOfGuests: 4,
                numOfBeds: 2,
                numOfBaths: 2,
                rating: 4.4
            },
            {
                _id: new ObjectId(),
                title: "Vinpearl Discovery Rockside Nha Trang",
                image: "https://images.trvl-media.com/hotels/13000000/12770000/12767200/12767198/922366c3.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
                address: "Hon Tre IsLand, Nha Trang",
                price: 2500,
                numOfGuests: 4,
                numOfBeds: 2,
                numOfBaths: 2,
                rating: 4
            },
        ];
        for (const item of mockData) {
            await db.listings.insertOne(item);
        }
        console.log("done!");
        
    } catch (error) {
       throw new Error("failed to seed database"); 
    }
}

seed();