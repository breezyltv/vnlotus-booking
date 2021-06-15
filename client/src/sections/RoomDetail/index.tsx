import { useQuery } from "@apollo/react-hooks";
import {
  ROOM_DETAIL,
  RoomDetail as RoomDetailData,
  RoomDetailVariables,
} from "../../lib/api/graphql/queries";
import { RouteComponentProps } from "react-router-dom";
import { Row, Col, Typography, Divider, Descriptions, Empty, Spin } from "antd";
import {
  SlideRoomDetail,
  Amenities,
  RoomHeader,
  RequestBooking,
  HeaderInfo,
} from "./components";
import { RoomContainer, SpinDiv } from "./styles";
import { PageSkeleton } from "../../lib/components";
const { Paragraph } = Typography;

type TParams = { id: string };

export const RoomDetail = ({ match }: RouteComponentProps<TParams>) => {
  console.log(match.params.id);

  const {
    data: roomDetail,
    loading,
    error,
  } = useQuery<RoomDetailData, RoomDetailVariables>(ROOM_DETAIL, {
    variables: { id: match.params.id },
  });
  console.log(roomDetail);

  let roomContainer = roomDetail?.room ? (
    <Row justify="space-between">
      <Col xs={24} lg={14} style={{ marginTop: "2rem" }}>
        <RoomHeader roomDetail={roomDetail} />
        <HeaderInfo roomDetail={roomDetail.room} />
        <Divider />
        <Paragraph>{roomDetail.room.description}</Paragraph>
        <Amenities />
        <Descriptions title="Check-in Time" bordered>
          <Descriptions.Item label="Check-in">2:00PM</Descriptions.Item>
          <Descriptions.Item label="Check-out">12:00PM</Descriptions.Item>
        </Descriptions>
      </Col>
      <Col xs={24} lg={8} style={{ marginTop: "2rem" }}>
        <RequestBooking roomDetail={roomDetail} />
      </Col>
    </Row>
  ) : (
    <PageSkeleton numberOfSkeletons={3} numberOfRows={5} />
  );
  let slide = roomDetail?.room ? (
    <SlideRoomDetail roomDetail={roomDetail} />
  ) : (
    <SpinDiv>
      <Spin />
    </SpinDiv>
  );
  if (!roomDetail?.room && !loading) {
    return <Empty description="No matching results found!" />;
  }

  return (
    <div>
      {slide}
      <RoomContainer>{roomContainer}</RoomContainer>
    </div>
  );
};
