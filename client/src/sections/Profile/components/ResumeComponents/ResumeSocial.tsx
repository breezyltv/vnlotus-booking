import { Col, Space, Button } from "antd";
import {
  InstagramOutlined,
  LinkedinOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { ResumeSocialList } from "../styles";
export const ResumeSocial = () => {
  return (
    <>
      <ResumeSocialList>
        <Col span={20}>
          <Space wrap>
            <Button
              type="link"
              icon={<GithubOutlined />}
              onClick={() =>
                window.location.assign("https://github.com/breezyltv")
              }
            >
              github.com/breezyltv
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
              inkedin.com/in/vu-le-3278a1203/
            </Button>
            <Button type="link" icon={<InstagramOutlined />}>
              @biltvu
            </Button>
          </Space>
        </Col>
      </ResumeSocialList>
    </>
  );
};
