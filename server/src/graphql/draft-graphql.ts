import {GraphQLObjectType, GraphQLID, GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLString, GraphQLSchema} from "graphql";

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

const listing = new GraphQLObjectType({
    name: "Listing",
    fields: {
        id: { type: GraphQLNonNull(GraphQLInt)},
        title: {type: GraphQLNonNull(GraphQLString)},
        image: {type: GraphQLNonNull(GraphQLString)},
        address: {type: GraphQLNonNull(GraphQLString)},
        price: {type: GraphQLNonNull(GraphQLInt)},
        numOfGuest: {type: GraphQLNonNull(GraphQLInt)},
        numOfBeds: {type: GraphQLNonNull(GraphQLInt)},
        numOfBaths: {type: GraphQLNonNull(GraphQLInt)},
        rating: {type: GraphQLNonNull(GraphQLInt)},
    }
})

const query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        listing: {
            type: GraphQLNonNull(GraphQLList(GraphQLNonNull(listing))),
            resolve: () => mockData
        }
    }
});

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        deleteListing: {
            type: GraphQLNonNull(GraphQLString),
            args: {
                id: {type: GraphQLNonNull(GraphQLID)}
            },
            resolve: (_root, {id})=> {
                for (let idx = 0; idx < mockData.length; idx++) {
                    if (mockData[idx] == id) {
                        return mockData.slice(idx, 1)[0];
                    }
                    
                }
                throw new Error("Failed to delete listing with ID: " + id);
            }
        }
    }
});

export const schema = new GraphQLSchema({query, mutation})