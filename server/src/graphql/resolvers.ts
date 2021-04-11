import {IResolvers} from "apollo-server-express";
const mockData = [
    {
        id: "001",
        title: "Paradise Point Resort",
        address: "1404 Vacation Road, Mission Bay, San Diego, CA 92109, USA",
        price: 1000,
        numOfGuests: 2,
        numOfBeds: 2,
        numOfBaths: 2,
        rating: 3
    },
    {
        id: "002",
        title: "Manchester Grand Hyatt San Diego",
        address: "One Market Place, Downtown San Diego, San Diego, CA 92101, USA",
        price: 1500,
        numOfGuests: 2,
        numOfBeds: 2,
        numOfBaths: 2,
        rating: 3
    },
    {
        id: "003",
        title: "Hilton San Diego Bayfront",
        address: "1 Park Boulevard, San Diego, 92101, USA",
        price: 2500,
        numOfGuests: 2,
        numOfBeds: 2,
        numOfBaths: 2,
        rating: 4
    },
]

export const resolvers: IResolvers = {
    Query: {
        listings: () => mockData
    },
    Mutation: {
        deleteListing: (_root: undefined, {id} : {id: string}) => {
            for (let idx = 0; idx < mockData.length; idx++) {
                if (mockData[idx].id === id) {
                    return mockData.slice(idx, 1)[0];
                }
                
            }
            throw new Error("Failed to delete listing with ID: " + id);
        }
    }
};