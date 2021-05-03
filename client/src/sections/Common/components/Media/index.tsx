import { Row, Col, Image, Typography } from "antd";
import { MediaDiv } from "../styles";
import coin_img from "../../assets/coins@2x.png";
import sale_img from "../../assets/top-sales@2x.png";
import wallet_img from "../../assets/wallet@2x.png";
import backpack_img from "../../assets/backpack@2x.png";

const { Title, Text } = Typography;
export const Media = () => {
  return (
    <>
      <Row gutter={[15, 0]}>
        <Col md={12} lg={12}>
          <MediaDiv>
            <Image src={coin_img} preview={false} />
            <Title level={3}> Credits Award </Title>
            <Text>
              Earn Coins for each successful booking and use them for your next
              trips.
            </Text>
          </MediaDiv>
        </Col>
        <Col md={12} lg={12}>
          {" "}
          <MediaDiv>
            <Image src={sale_img} preview={false} />
            <Title level={3}> Smart functions </Title>
            <Text>
              Check-in and check your receipts offline. Refund faster and change
              calendar easier.
            </Text>
          </MediaDiv>
        </Col>
      </Row>
      <Row gutter={[15, 0]}>
        <Col md={12} lg={12}>
          <MediaDiv>
            <Image src={wallet_img} preview={false} />
            <Title level={3}> Simple payment </Title>
            <Text>
              Save card information in My Cards, much safer and convenient for
              the next payment.
            </Text>
          </MediaDiv>
        </Col>
        <Col md={12} lg={12}>
          {" "}
          <MediaDiv>
            <Image src={backpack_img} preview={false} />
            <Title level={3}> New promotions every day </Title>
            <Text>
              Update promotions from Lotus Homestay and choose great
              accommodation at your budget.
            </Text>
          </MediaDiv>
        </Col>
      </Row>
    </>
  );
};
