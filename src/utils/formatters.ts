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

export const formatBirthDate = (value: string): string => {
  // 8자리 숫자를 YYYY-MM-DD 형태로 변환
  const numericValue = value.replace(/[^0-9]/g, "");

  if (numericValue.length !== 8) {
    return numericValue;
  }

  const year = numericValue.slice(0, 4);
  const month = numericValue.slice(4, 6);
  const day = numericValue.slice(6, 8);

  return `${year}-${month}-${day}`;
};

export const formatMinuteSecond = (seconds: number): string => {
  const remainingMinutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const remainingSeconds = String(seconds % 60).padStart(2, "0");
  return `${remainingMinutes}:${remainingSeconds}`;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("ko-KR").format(amount);
};
