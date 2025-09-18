import dayjs from "dayjs";

export const formatTopDate = (dateStr: string): string => {
  return dayjs(dateStr).format("M월 D일");
};

export const formatCardDate = (dateStr: string): string => {
  return dayjs(dateStr).format("YY년 M월 D일");
};

export const formatDate = (dateStr: string, format: string): string => {
  return dayjs(dateStr).format(format);
};
