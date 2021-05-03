import { BannerStyled, BannerContainer } from "../styles";
import { Typography } from "antd";

const { Title, Text } = Typography;
export const Banner = () => {
  return (
    <BannerStyled>
      <BannerContainer>
        <Title level={1}>Sign up for more promotions and benefits</Title>
        <Text>
          Swift, convenient, and safe. Sign up now for more interests.
        </Text>
      </BannerContainer>
    </BannerStyled>
  );
};
