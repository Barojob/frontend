export const formatBusinessNumber = (value: string): string => {
  const numericValue = value.replace(/[^0-9]/g, "").slice(0, 10);

  if (numericValue.length < 4) {
    return numericValue;
  }
  if (numericValue.length < 6) {
    return `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`;
  }
  return `${numericValue.slice(0, 3)}-${numericValue.slice(
    3,
    5,
  )}-${numericValue.slice(5)}`;
};

export const formatPhoneNumber = (value: string): string => {
  const numericValue = value.replace(/[^0-9]/g, "").slice(0, 11);

  if (numericValue.length < 4) {
    return numericValue;
  }
  if (numericValue.length < 8) {
    return `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`;
  }
  return `${numericValue.slice(0, 3)}-${numericValue.slice(
    3,
    7,
  )}-${numericValue.slice(7)}`;
};

export const formatMinuteSecond = (seconds: number): string => {
  const remainingMinutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const remainingSeconds = String(seconds % 60).padStart(2, "0");
  return `${remainingMinutes}:${remainingSeconds}`;
};
