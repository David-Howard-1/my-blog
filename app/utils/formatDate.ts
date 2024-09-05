import dayjs from "dayjs";

type Props = {
  date: string;
  format?: string;
};

export const formatDate = ({ date, format = "M/D/YYYY" }: Props) => {
  return dayjs(date).format(format);
};
