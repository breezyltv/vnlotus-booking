import { Row, Col } from "antd";
import { LoginContainer } from "./styles";
import { Banner, Media } from "../Common";
import { LoginForm } from "./components";
import { Footer } from "../Footer";
export const SignIn = () => {
  return (
    <>
      <Banner />
      <LoginContainer>
        <Row gutter={[15, 0]} justify="center">
          <Col
            xs={{ span: 24, order: 2 }}
            sm={{ span: 24, order: 2 }}
            lg={{ span: 16, order: 1 }}
          >
            <Media />
          </Col>
          <Col
            xs={{ span: 24, order: 1 }}
            sm={{ span: 24, order: 1 }}
            md={{ span: 12, order: 1 }}
            lg={{ span: 8, order: 2 }}
          >
            <LoginForm />
          </Col>
        </Row>
      </LoginContainer>
      <Footer />
    </>
  );
};
