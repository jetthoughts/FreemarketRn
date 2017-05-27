const padTime = number => (number < 10 ? '0' + number : number);

export const dateToTimeString = (date) => (
  [
    padTime(date.getHours()), 
    padTime(date.getMinutes())
  ].join(':')
);

export const categoriesToObject = records => {
  const object = {};
  records.forEach(record => object[record.id] = record.name);
  return object;
}