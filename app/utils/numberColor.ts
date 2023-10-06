export const numberColor = (num: number, maxValue: number) => {
  if ((num / maxValue) * 10 >= 7) {
    return 'green';
  }
  return 'red';
};
