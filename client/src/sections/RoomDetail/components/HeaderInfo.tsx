import { Typography, Button, Rate } from "antd";
import { EnvironmentOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { InfoDiv } from "../styles";
import { RoomDetail_room as IRoom } from "../../../lib/api/graphql/queries";
const { Text, Title } = Typography;

interface Props {
  roomDetail: IRoom;
}

export const HeaderInfo = ({ roomDetail }: Props) => {
  return (
    <InfoDiv direction="vertical">
      <Title level={1}>{roomDetail.title}</Title>
      <Rate disabled allowHalf defaultValue={roomDetail.rating} />
      <Text>
        <EnvironmentOutlined /> {roomDetail.city}, {roomDetail.country}
        <Button type="link">View on Map</Button>
      </Text>
      <Text>
        <InfoCircleOutlined /> Other · 32 m2
      </Text>
      <Text>
        Private room · {roomDetail.numOfBaths} Bathroom · {roomDetail.numOfBeds}{" "}
        bed · {roomDetail.numOfGuests} guests (max {roomDetail.numOfGuests}{" "}
        guests)
      </Text>
    </InfoDiv>
  );
};
