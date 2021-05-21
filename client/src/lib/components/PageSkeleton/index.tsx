import { Skeleton } from "antd";

interface Props {
  numberOfSkeletons: number;
  numberOfRows: number;
}

//type Element = JSX.Element;

export const PageSkeleton = ({
  numberOfSkeletons = 1,
  numberOfRows,
}: Props) => {
  let skeletons = [];

  for (let i = 0; i < numberOfSkeletons; i++) {
    skeletons.push(
      <Skeleton key={i} active paragraph={{ rows: numberOfRows }} />
    );
  }

  return <div>{skeletons}</div>;
};
