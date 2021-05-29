import { Link } from "react-router-dom";
import { FooterContentRow } from "../styles";
import { Image, Col, Space, Typography, Button } from "antd";
import {
  InstagramOutlined,
  LinkedinOutlined,
  GithubOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import stripLogo from "../assets/stripe.svg";
import visaLogo from "../assets/visa.svg";
import masterLogo from "../assets/mastercard.svg";
const { Text, Title } = Typography;
export const FooterContent = () => {
  return (
    <FooterContentRow gutter={[0, 20]} justify="space-between">
      <Col xs={24} sm={12} lg={4}>
        <Space direction="vertical">
          <Title level={5}>Socials</Title>
          <Button type="link" icon={<InstagramOutlined />}>
            @biltvu
          </Button>
          <Button
            type="link"
            icon={<LinkedinOutlined />}
            onClick={() =>
              window.location.assign(
                "https://www.linkedin.com/in/vu-le-3278a1203/"
              )
            }
          >
            vu-le-3278a1203
          </Button>
          <Button type="link" icon={<FacebookOutlined />}>
            @biltvu
          </Button>
          <Button
            type="link"
            icon={<GithubOutlined />}
            onClick={() =>
              window.location.assign("https://github.com/breezyltv")
            }
          >
            breezyltv
          </Button>
        </Space>
      </Col>
      <Col xs={24} sm={12} lg={4}>
        <Space direction="vertical">
          <Title level={5}>EXPLORE DESTINATIONS</Title>
          <Text>
            <Link to="/">San Diego</Link>
          </Text>
          <Text>
            <Link to="/">San Francisco</Link>
          </Text>
          <Text>
            <Link to="/">New York</Link>
          </Text>
          <Text>
            <Link to="/">Ho Chi Minh</Link>
          </Text>
          <Text>
            <Link to="/">Tokyo</Link>
          </Text>
        </Space>
      </Col>
      <Col xs={24} sm={12} lg={4}>
        <Space direction="vertical">
          <Title level={5}>EXPLORE DESTINATIONS</Title>
          <Text>
            <Link to="/">San Diego</Link>
          </Text>
          <Text>
            <Link to="/">San Francisco</Link>
          </Text>
          <Text>
            <Link to="/">New York</Link>
          </Text>
          <Text>
            <Link to="/">Ho Chi Minh</Link>
          </Text>
          <Text>
            <Link to="/">Tokyo</Link>
          </Text>
        </Space>
      </Col>
      <Col xs={24} sm={12} lg={4}>
        <Space direction="vertical">
          <Title level={5}>SECURE YOUR TRANSACTION</Title>

          <Image alt="visa" src={visaLogo} width={90} preview={false} />
          <Image alt="mastercard" src={masterLogo} width={90} preview={false} />
          <Image alt="stripe" src={stripLogo} width={90} preview={false} />
        </Space>
      </Col>
    </FooterContentRow>
  );
};
