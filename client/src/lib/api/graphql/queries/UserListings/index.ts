import { gql } from "apollo-boost";

export const USER_LISTING = gql`
  query UserListing(
    $id: ID!
    $bookingsPage: Int!
    $listingsPage: Int!
    $limit: Int!
  ) {
    user(id: $id) {
      id
      avatar
      displayName
      first_name
      last_name
      email
      provider
      phone
      address
      birthday
      gender
      bio
      hasWallet
      income
      bookings(limit: $limit, page: $bookingsPage) {
        total
        result {
          _id
          room {
            _id
            title
            image {
              main
            }
            address
            price
            numOfGuests
          }
        }
      }
      rooms(limit: $limit, page: $listingsPage) {
        total
        result {
          _id
          title
          image {
            main
            collection
          }
          type
          price
          numOfBeds
          numOfBaths
          numOfGuests
          rating
        }
      }
    }
  }
`;
