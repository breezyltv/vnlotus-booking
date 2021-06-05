import { useContext, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../lib/auth/AuthProvider";
import { Row, Col, Typography, Space, Empty, List } from "antd";
import { ListingCard, SearchHeader, LoadingCard } from "../../../Common";
import { UserContainer } from "../../styles";
import {
  USER_LISTING,
  UserListing as UserListingType,
  UserListingVariables,
} from "../../../../lib/api/graphql/queries/";
const { Title } = Typography;
const PAGE_LIMIT = 8;
export const MyListings = () => {
  const { viewer } = useContext(AuthContext);
  const [bookingsPage, setBookingsPage] = useState(1);
  const [listingsPage, setListingsPage] = useState(1);

  const {
    data,
    loading: loadingUserListings,
    error: getUserListingsError,
  } = useQuery<UserListingType, UserListingVariables>(USER_LISTING, {
    variables: {
      id: viewer.id ? viewer.id : "",
      bookingsPage: bookingsPage,
      listingsPage: listingsPage,
      limit: PAGE_LIMIT,
    },
  });
  console.log(data);

  const generateLoadingListingCard = (): JSX.Element[] => {
    let listing: JSX.Element[] = [];
    for (let index = 0; index < PAGE_LIMIT; index++) {
      listing.push(
        <Col lg={{ span: 6 }}>
          <LoadingCard key={index} />
        </Col>
      );
    }
    return listing;
  };

  const listCard = (
    <List
      grid={{
        gutter: 20,
        xs: 1,
        sm: 2,
        md: 2,
        lg: 4,
        xl: 4,
        xxl: 4,
      }}
      dataSource={data?.user.rooms.result}
      locale={{
        emptyText:
          "No matching results found or user does not have any listings yet!",
      }}
      pagination={{
        position: "bottom",
        current: listingsPage,
        total: data?.user.rooms.total,
        defaultPageSize: PAGE_LIMIT,
        hideOnSinglePage: true,
        showLessItems: true,
        onChange: (page) => setListingsPage(page),
      }}
      renderItem={(room) => (
        <List.Item>
          <Link key={room._id} to={`/room/${room._id}`}>
            <ListingCard
              key={room._id}
              room={room}
              loadingUserListings={false}
            />
          </Link>
        </List.Item>
      )}
    />
  );

  const listingsContent =
    data?.user.rooms.total !== 0 || data?.user.rooms.result.length !== 0 ? (
      <>
        <Space>
          <Title level={3}>Your Listings: {data?.user.rooms.total}</Title>
        </Space>
        <SearchHeader />
        <Row gutter={[25, 25]}>
          {loadingUserListings ? generateLoadingListingCard() : listCard}
        </Row>
      </>
    ) : (
      <Empty description="No matching results found or user does not have any listings yet!" />
    );

  return (
    <UserContainer style={{ marginTop: 30, marginBottom: 30 }}>
      {listingsContent}
    </UserContainer>
  );
};
