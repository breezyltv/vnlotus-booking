import { Skeleton } from "antd";
import Avatar from "antd/lib/avatar/avatar";

interface Props {
  numberOfSkeletons?: number;
  numberOfRows?: number;
  avatar?: boolean;
}

//type Element = JSX.Element;

export const PageSkeleton = ({
  numberOfSkeletons = 1,
  numberOfRows = 3,
  avatar = false,
}: Props) => {
  let skeletons = [];

  for (let i = 0; i < numberOfSkeletons; i++) {
    skeletons.push(
      <Skeleton
        key={i}
        avatar={avatar}
        active
        paragraph={{ rows: numberOfRows }}
      />
    );
  }

  return <div>{skeletons}</div>;
};
