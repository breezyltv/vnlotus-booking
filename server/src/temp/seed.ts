require("dotenv").config();
import { ObjectId } from "mongodb";
import { connectDatabase } from "../database";
import { Room, RoomType, User, LoginProvider } from "../lib/types";

const seed = async () => {
  try {
    console.log("[seed]: running...");
    const db = await connectDatabase();

    const users: User[] = [
      {
        _id: "QhzwgJ9De9VOugJIo3z0gsPoVuV2",
        token: "token_************",
        first_name: "Vu",
        last_name: "Le",
        avatar:
          "https://lh3.googleusercontent.com/a-/AOh14Ghxa2eTURMkPvkLHGujR9Qasqzw379EEje5taCX7g=s96-c",
        email: "kevinlethevu@gmail.com",
        provider: LoginProvider.Google,
        walletId: "kevinlethevu@gmail.com",
        income: 69000,
        bookings: [],
        rooms: [
          new ObjectId("607671a4c647b7455a4a3ffa"),
          new ObjectId("607671a4c647b7455a4a4ffa"),
          new ObjectId("607671a4c647b7455a4a5ffa"),
          new ObjectId("607671a4c647b7455a4a6ffa"),
        ],
      },
      {
        _id: "q7oELMr0HcNDJJkWbB1NJR73HvP2",
        token: "token_************",
        first_name: "Kevin",
        last_name: "Le",
        avatar:
          "https://lh3.googleusercontent.com/a-/AOh14Ghxa2eTURMkPvkLHGujR9Qasqzw379EEje5taCX7g=s96-c",
        email: "bi.nhoc9x@gmail.com",
        provider: LoginProvider.Google,
        walletId: "kevinlethevu@gmail.com",
        income: 29000,
        bookings: [],
        rooms: [
          new ObjectId("607671a4c647b7455a4a1ffa"),
          new ObjectId("607671a4c647b7455a4a2ffa"),
        ],
      },
    ];

    const mockData: Room[] = [
      {
        _id: new ObjectId("607671a4c647b7455a4a1ffa"),
        title: "Paradise Point Resort",
        image: {
          main: "https://media-cdn.tripadvisor.com/media/photo-o/07/18/91/93/paradise-point-resort.jpg",
        },
        description:
          "Tucked away on gentle Mission Bay in the heart of San Diego, Paradise Point Resort & Spa features comfortable bungalow-style guestrooms amidst lush, tropical gardens, tranquil lagoons, and one mile of sandy beach next door to SeaWorld. Scattered across our 44-acre island, you’ll find plenty of room to roam and relax at our Mission Bay, San Diego resort with five swimming pools, beach bonfire pits, a marina, five dining venues, an award-winning spa and endless recreation options",
        host: "5d378db94e84753160e08b57",
        type: RoomType.Resort,
        address: "1404 Vacation Road, Mission Bay, San Diego, CA 92109, USA",
        country: "USA",
        admin: "vutl",
        city: "San Diego",
        bookings: [],
        bookingsIndex: {},
        price: 1000,
        numOfGuests: 2,
        numOfBeds: 2,
        numOfBaths: 2,
        rating: 3,
      },
      {
        _id: new ObjectId("607671a4c647b7455a4a2ffa"),
        title: "Manchester Grand Hyatt San Diego",
        image: {
          main: "https://media-cdn.tripadvisor.com/media/photo-o/0a/1b/25/38/top-of-the-hyatt-sky.jpg",
        },
        description:
          "Experience comfort and convenience at our waterfront hotel in downtown San Diego. Each of our 1,628 spacious rooms features soothing décor and modern amenities to help you relax and recharge during your California escape. Upgrade to a Grand Club® room for exclusive lounge access, or opt for one of our upscale suites, with additional living space and panoramic Pacific Ocean views. ",
        host: "5d378db94e84753160e08b57",
        type: RoomType.Hotel,
        address:
          "One Market Place, Downtown San Diego, San Diego, CA 92101, USA",
        country: "USA",
        admin: "vutl",
        city: "San Diego",
        bookings: [],
        bookingsIndex: {},
        price: 1500,
        numOfGuests: 2,
        numOfBeds: 2,
        numOfBaths: 2,
        rating: 3,
      },
      {
        _id: new ObjectId("607671a4c647b7455a4a3ffa"),
        title: "Hilton San Diego Bayfront",
        image: {
          main: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/96/7d/e0/hilton-san-diego-bayfront.jpg?w=1500&h=-1&s=1",
        },
        description:
          "Steps from downtown's Gaslamp Quarter, PETCO Park & Convention Center, our beautiful waterfront hotel offers the finest amenities & lays the best of our city at your doorstep.",
        host: "5d378db94e84753160e08b57",
        type: RoomType.Hotel,
        address: "1 Park Boulevard, San Diego, 92101, USA",
        country: "USA",
        admin: "vutl",
        city: "San Diego",
        bookings: [],
        bookingsIndex: {},
        price: 2500,
        numOfGuests: 2,
        numOfBeds: 2,
        numOfBaths: 2,
        rating: 4,
      },
      {
        _id: new ObjectId("607671a4c647b7455a4a4ffa"),
        title: "Cham Oasis Nha Trang Resort Condotel",
        image: {
          main: "https://images.trvl-media.com/hotels/17000000/16520000/16518000/16517903/e46fb7e2.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
          collection: [
            "https://product.hstatic.net/1000067077/product/_n5_6356_f9acddeceaf54300877cddb6b678a328_master.jpg",
            "https://product.hstatic.net/1000067077/product/_n5_6364_3c00fe7c9b3c4d9a9caa90d563e03316_master.jpg",
            "https://product.hstatic.net/1000067077/product/_n5_6381_8f85bf62d683454db69b6d294415fa98_master.jpg",
          ],
        },
        description:
          "Nestled in the heart of Ngoc Hiep, Cham Oasis Nha Trang - Resort Condotel is an ideal spot from which to discover Nha Trang. The city center is merely 3 KM away and the airport can be reached within 40 minutes. With its convenient location, the hotel offers easy access to the city's must-see destinations.",
        host: "5d378db94e84753160e08b57",
        type: RoomType.Resort,
        address: "304, 2/4 Street, Vinh Phuoc, Nha Trang",
        country: "Vietnam",
        admin: "vutl",
        city: "Nha trang",
        bookings: [],
        bookingsIndex: {},
        price: 800,
        numOfGuests: 4,
        numOfBeds: 2,
        numOfBaths: 2,
        rating: 4.4,
      },
      {
        _id: new ObjectId("607671a4c647b7455a4a5ffa"),
        title: "Vinpearl Discovery Rockside Nha Trang",
        image: {
          main: "https://images.trvl-media.com/hotels/13000000/12770000/12767200/12767198/922366c3.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        },
        description:
          "Situated in Hon Tre, Vinpearl Discovery Rockside Nha Trang is the perfect place to experience Nha Trang and its surroundings. The hotel lies 6.5 kilometers from the city center and provides accessibility to important town facilities. With its convenient location, the hotel offers easy access to the city's must-see destinations.",
        host: "5d378db94e84753160e08b57",
        type: RoomType.Resort,
        address: "Hon Tre IsLand, Nha Trang",
        country: "Vietnam",
        admin: "Vutl",
        city: "Nha trang",
        bookings: [],
        bookingsIndex: {},
        price: 1100,
        numOfGuests: 4,
        numOfBeds: 2,
        numOfBaths: 2,
        rating: 4,
      },
      {
        _id: new ObjectId("607671a4c647b7455a4a7ffa"),
        title: "Rustic Loft with Hidden Private Balcony",
        image: {
          main: "https://cdn.luxstay.com/rooms/13337/large/_DSC3316-Edit.jpg",
          collection: [
            "https://cdn.luxstay.com/rooms/13337/large/_DSC3316-Edit.jpg",
            "https://cdn.luxstay.com/rooms/13337/large/_DSC3334-Edit.jpg",
            "https://cdn.luxstay.com/rooms/13337/large/_DSC3332-Edit.jpg",
          ],
        },
        description:
          "an apartment of HoLo Opera Saigon - a member of HoLo Fairy Houses Serviced HomeStay Chain. In core CBD of Ho Chi Minh City, walking distances to Opera House, Nguyen Hue Boulevard, Ben Thanh Market & other key tourist attractions.",
        host: "5d378db94e84753160e08b57",
        type: RoomType.Homestay,
        address: "Quận 1, Hồ Chí Minh, Vietnam",
        country: "Vietnam",
        admin: "vutl",
        city: "Ho Chi Minh",
        bookings: [],
        bookingsIndex: {},
        price: 180,
        numOfGuests: 2,
        numOfBeds: 1,
        numOfBaths: 1,
        rating: 3,
      },
      {
        _id: new ObjectId("607671a4c647b7455a4a6ffa"),
        title: "The Royal Homies Suite Balcony - Phu My Hung",
        image: {
          main: "https://cdn.luxstay.com/users/276795/u3vrFFRpXMQ_TPlq3_SUTszU.jpg",
          collection: [
            "https://cdn.luxstay.com/users/276795/JK12t4VGHwPBFrityUTH0w0B.jpg",
            "https://cdn.luxstay.com/users/276795/NsC7auTXkRAtbmUpu9Bi70ra.jpg",
            "https://cdn.luxstay.com/users/276795/OpZBg65-6F32VU6vy6i23aWD.jpg",
          ],
        },
        description:
          "We offer accommodation and associated services for short and long term guests as domestic, business travelers, tourists and many people around the world who plan to come visit to Vietnam. Saigon Exhibition and Convention Center reachable in 1,5 km. We feature accommodation, restaurant, cafe, shared lounge and garden park yard with free high speed WiFi is available throughout the property.",
        host: "5d378db94e84753160e08b57",
        type: RoomType.Apartment,
        address: "Quận 7, Hồ Chí Minh, Vietnam",
        country: "Vietnam",
        admin: "vutl",
        city: "Ho Chi Minh",
        bookings: [],
        bookingsIndex: {},
        price: 34,
        numOfGuests: 2,
        numOfBeds: 1,
        numOfBaths: 1,
        rating: 4.5,
      },
    ];
    for (const item of mockData) {
      await db.rooms.insertOne(item);
    }
    for (const item of users) {
      await db.users.insertOne(item);
    }
    console.log("done!");
  } catch (error) {
    throw new Error("failed to seed database");
  } finally {
    process.exit();
  }
};

seed();
