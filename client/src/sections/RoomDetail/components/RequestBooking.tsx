import { useState } from "react";
import moment from "moment";
import { Affix, DatePicker, Typography, Space, Tag } from "antd";
import {
  RequestBookingCard,
  RequestBookingInput,
  PickerCellStyled,
  PriceBarDiv,
} from "../styles";
import { CustomButton } from "../../../styles";
import { RoomDetail } from "../../../lib/api/graphql/queries";
const { RangePicker } = DatePicker;
const { Meta } = RequestBookingCard;
const { Text } = Typography;
const dateFormatList = ["MM/DD/YYYY", "MM/DD/YY"];

interface Props {
  roomDetail: RoomDetail;
}

export const RequestBooking = ({ roomDetail }: Props) => {
  //const [openDatePicker, setOpenDatePicker] = useState(false);
  const initPrice = roomDetail.room.price;
  const [price, setPrice] = useState(initPrice);
  const handleDatePicker = (date: any, dateString: [string, string]) => {
    console.log(date, dateString);
    const totalPickedDays = date
      ? Math.abs(moment.duration(date[0].diff(date[1])).asDays()) + 1
      : 1;
    setPrice(initPrice * totalPickedDays);
  };
  const handleRequestBooking = () => {};

  const PriceBar = (
    <PriceBarDiv>
      <Text className="price-banner">${price}</Text>
      <Text>/night</Text>
    </PriceBarDiv>
  );

  const description = (
    <Space direction="vertical">
      <Tag color="#ff4757">Discount 30% from host</Tag>
      <Text>
        Sale off 30% for reservation with check-in date from 01/04 to 15/06
      </Text>
    </Space>
  );

  return (
    <Affix offsetTop={100}>
      <RequestBookingCard>
        <Meta title={PriceBar} description={description} />
        <RequestBookingInput>
          <RangePicker
            size="large"
            //open={openDatePicker}
            format={dateFormatList}
            disabledDate={(current) =>
              current && current < moment().endOf("day")
            }
            dateRender={(current) => {
              const oneNight =
                current > moment().endOf("day") ? (
                  <Text>${initPrice}</Text>
                ) : (
                  ""
                );
              return (
                <div
                  className="ant-picker-cell-inner"
                  style={{
                    height: "30px",
                    lineHeight: "13px",
                    minWidth: "30px",
                    padding: "2px",
                  }}
                >
                  <PickerCellStyled>
                    <Text>{current.date()}</Text>
                    {oneNight}
                  </PickerCellStyled>
                </div>
              );
            }}
            onChange={handleDatePicker}
          />
          <CustomButton block size="large" onClick={handleRequestBooking}>
            Request to Book
          </CustomButton>
        </RequestBookingInput>
      </RequestBookingCard>
    </Affix>
  );
};
