import { Row, Col, Typography, Divider, Descriptions } from "antd";
import {
  SlideRoomDetail,
  Amenities,
  RoomHeader,
  RequestBooking,
  HeaderInfo,
} from "./components";
import { RoomContainer } from "./styles";

const { Paragraph } = Typography;

export const RoomDetail = () => {
  return (
    <div>
      <SlideRoomDetail />
      <RoomContainer>
        <Row justify="space-between">
          <Col xs={24} lg={14} style={{ marginTop: "2rem" }}>
            <RoomHeader />
            <HeaderInfo />
            <Divider />
            <Paragraph>
              The apartment is located in 5 * Champa Island Resort with full
              facilities of a 5 * resort with large pool and beautiful views.
              Apartment has 2 separate bedrooms with large beds, kitchen with
              full kitchen, washing machine, fridge ...
            </Paragraph>
            <Amenities />
            <Descriptions title="Check-in Time" bordered>
              <Descriptions.Item label="Check-in">2:00PM</Descriptions.Item>
              <Descriptions.Item label="Check-out">12:00PM</Descriptions.Item>
            </Descriptions>
          </Col>
          <Col xs={24} lg={8} style={{ marginTop: "2rem" }}>
            <RequestBooking />
          </Col>
        </Row>
      </RoomContainer>
    </div>
  );
};
