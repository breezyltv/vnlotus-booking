import { gql } from "apollo-boost";

export const ROOM_DETAIL = gql`
  query RoomDetail($id: ID!) {
    room(id: $id) {
      _id
      title
      description
      image {
        main
        collection
      }
      host {
        _id
        displayName
        avatar
        email
        phone
      }
      type
      address
      city
      country
      price
      numOfBeds
      numOfBaths
      numOfGuests
      rating
    }
  }
`;
