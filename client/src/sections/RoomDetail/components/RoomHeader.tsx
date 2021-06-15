import { useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Space, Avatar, Rate } from "antd";
import { WishlistButton } from "../../Common/styles";
import { colorSchemes } from "../../../styles";
import { RoomHeaderDiv } from "../styles";
import { UserOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
import { RoomDetail } from "../../../lib/api/graphql/queries";
const { Text, Title } = Typography;

interface Props {
  roomDetail: RoomDetail | undefined;
}

export const RoomHeader = ({ roomDetail }: Props) => {
  const [wishlist, setWishlist] = useState(false);
  const handleWishlist = () => {
    setWishlist(!wishlist);
  };
  return (
    <RoomHeaderDiv>
      <Space>
        <Link to={`/host/${roomDetail?.room?.host._id}`}>
          {roomDetail?.room.host.avatar ? (
            <Avatar
              shape="square"
              size={64}
              src={roomDetail?.room.host.avatar}
            />
          ) : (
            <Avatar shape="square" size={64} icon={<UserOutlined />} />
          )}
        </Link>
        <Space direction="vertical">
          <Text>
            Listed By:{" "}
            <Link to={`/host/${roomDetail?.room?.host._id}`}>
              {roomDetail?.room?.host.displayName}
            </Link>
          </Text>
          <Text>Contact: {roomDetail?.room?.host.email}</Text>
        </Space>
      </Space>
      <Text>
        Save{" "}
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
              <HeartFilled />
            )
          }
        />
      </Text>
    </RoomHeaderDiv>
  );
};
