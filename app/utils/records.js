export const categoriesToObject = (records) => {
  const object = {};
  records.forEach(record => object[record.id] = record.name);
  return object;
};
