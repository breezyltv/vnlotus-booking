import { useState } from "react";
import {
  ListingCardWrapper,
  MetaInfoDiv,
  MetaPromoDiv,
  WishlistButton,
  MetaPriceDiv,
  CoverImageFallbackDiv,
} from "../styles";
import { Image, Typography, Skeleton } from "antd";
import {
  StarFilled,
  HomeOutlined,
  HeartFilled,
  HeartOutlined,
  TeamOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { colorSchemes } from "../../../styles";
import { UserListing_user_rooms_result as UserRoomType } from "../../../lib/api/graphql/queries/";
const { Meta } = ListingCardWrapper;
const { Text } = Typography;
interface Props {
  room?: UserRoomType | undefined;
  loadingUserListings: boolean;
  hasWishlist?: boolean;
}
export const ListingCard = ({
  room,
  loadingUserListings,
  hasWishlist,
}: Props) => {
  //console.log(room);

  const [wishlist, setWishlist] = useState(false);
  const handleWishlist = () => {
    setWishlist(!wishlist);
  };

  const showWishlist = hasWishlist ? (
    <WishlistButton
      onClick={handleWishlist}
      type="link"
      icon={
        wishlist ? (
          <HeartFilled
            style={{
              color: colorSchemes["color-red"],
              animation: "add-to-wishlist-heart 0.6s steps(30)",
            }}
            className="add-heart-animation"
          />
        ) : (
          <HeartOutlined />
        )
      }
    />
  ) : null;

  return (
    <ListingCardWrapper
      hoverable
      cover={
        <>
          <MetaPromoDiv>
            <Text className="promo__label">-30% Today</Text>

            {showWishlist}
          </MetaPromoDiv>
          {room?.image?.main ? (
            <Image preview={false} alt={room?.title} src={room?.image?.main} />
          ) : (
            <CoverImageFallbackDiv>
              <PictureOutlined />
            </CoverImageFallbackDiv>
          )}
        </>
      }
    >
      <Skeleton loading={loadingUserListings} active paragraph={{ rows: 2 }}>
        <MetaInfoDiv>
          <Text>
            <HomeOutlined /> {room?.type} - {room?.numOfBeds} bedroom
          </Text>
          <Text className="meta-rating">
            {room?.rating && room?.rating > 0 ? (
              <>
                <StarFilled style={{ color: colorSchemes["main-color"] }} />
                {room?.rating}(2)
              </>
            ) : (
              <>
                <StarFilled />
                (0)
              </>
            )}
          </Text>
        </MetaInfoDiv>
        <Meta
          title={room?.title}
          description={
            <MetaPriceDiv>
              <Text>${room?.price}/night</Text>
              <Text>
                <TeamOutlined />
                {room?.numOfGuests} guests
              </Text>
            </MetaPriceDiv>
          }
        />
      </Skeleton>
    </ListingCardWrapper>
  );
};
