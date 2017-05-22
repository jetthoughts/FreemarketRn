export const objectWithRecordsToArray = records => (
  Object.keys(records).map(id => ({ ...records[id], id }))
);

const padTime = number => (number < 10 ? '0' + number : number);

export const dateToTimeString = (date) => (
  [
    padTime(date.getHours()), 
    padTime(date.getMinutes())
  ].join(':')
);