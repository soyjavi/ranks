const REGEXP = /(#)(\S+\s)/;

export default (value) => {
  const parts = REGEXP.exec(value);
  return parts ? parts[0] : parts;
};
