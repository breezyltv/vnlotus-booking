import { ListingCardWrapper, CoverImageFallbackDiv } from "../styles";
import { Skeleton } from "antd";
import { PictureOutlined } from "@ant-design/icons";
export const LoadingCard = () => {
  return (
    <ListingCardWrapper
      cover={
        <CoverImageFallbackDiv>
          <PictureOutlined />
        </CoverImageFallbackDiv>
      }
    >
      <Skeleton active paragraph={{ rows: 2 }} />
    </ListingCardWrapper>
  );
};
