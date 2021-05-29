import { Space, Typography, Divider } from "antd";
import { IntroHeaderSpace, RoomTypeMenuSpace } from "../styles";
import { Link } from "react-router-dom";
import { CustomButtonPrimary } from "../../../styles";
import { RoomType, Viewer } from "../../../lib/types";
const { Text, Title } = Typography;
interface Props {
  viewer: Viewer;
}
export const IntroHeader = ({ viewer }: Props) => {
  return (
    <IntroHeaderSpace>
      <RoomTypeMenuSpace split={<Divider type="vertical" />}>
        <Link to={`/rooms/type/${RoomType.APARTMENT}`}>APARTMENT</Link>
        <Link to={`/rooms/type/${RoomType.HOMESTAY}`}>HOMESTAY</Link>
        <Link to={`/rooms/type/${RoomType.HOTEL}`}>HOTEL</Link>
      </RoomTypeMenuSpace>
      <Space direction="vertical" className="intro-header-detail">
        <Title level={2}>
          Welcome to Lotus Homestay
          {viewer.displayName ? `, ${viewer.displayName}` : null}!
        </Title>
        <Text>
          Book homes, homestay, car rental, experience and more on Lotus
        </Text>
        <CustomButtonPrimary>Book Now!</CustomButtonPrimary>
      </Space>
      <RoomTypeMenuSpace split={<Divider type="vertical" />}>
        <Link to={`/rooms/type/${RoomType.HOUSE}`}>HOUSE</Link>
        <Link to={`/rooms/type/${RoomType.RESORT}`}>RESORT</Link>
        <Link to={`/rooms/type/${RoomType.VILLA}`}>VILLA</Link>
      </RoomTypeMenuSpace>
    </IntroHeaderSpace>
  );
};
