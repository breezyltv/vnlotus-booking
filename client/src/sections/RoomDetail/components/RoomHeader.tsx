import { useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Space, Avatar, Rate } from "antd";
import { WishlistButton } from "../../Common/styles";
import { colorSchemes } from "../../../styles";
import { RoomHeaderDiv } from "../styles";
import { UserOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
const { Text, Title } = Typography;
export const RoomHeader = () => {
  const [wishlist, setWishlist] = useState(false);
  const handleWishlist = () => {
    setWishlist(!wishlist);
  };
  return (
    <RoomHeaderDiv>
      <Space>
        <Link to="/host/:id">
          <Avatar shape="square" size={64} icon={<UserOutlined />} />
        </Link>
        <Space direction="vertical">
          <Text>
            Listed By: <Link to="/host/:id">Vu Le</Link>
          </Text>
          <Text>Listings: 10</Text>
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
