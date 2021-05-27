import { BannerStyled, CommonContainer } from "../styles";
import { Typography } from "antd";

const { Title, Text } = Typography;
interface Props {
  title: string;
  level?: 5 | 1 | 2 | 3 | 4 | undefined;
  description?: string | null;
}
export const Banner = ({ title, level = 1, description = null }: Props) => {
  return (
    <BannerStyled>
      <CommonContainer>
        <Title level={level}>{title}</Title>
        {description ? <Text>{description}</Text> : null}
      </CommonContainer>
    </BannerStyled>
  );
};
