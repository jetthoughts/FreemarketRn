const padTime = number => (number < 10 ? '0' + number : number);

export const dateToTimeString = date => (
  [
    padTime(date.getHours()),
    padTime(date.getMinutes()),
  ].join(':')
);
