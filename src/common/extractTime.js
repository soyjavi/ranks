const REGEXP = /(\d+)(m|h)/;

export default (value) => {
  const parts = REGEXP.exec(value);
  if (!parts) return parts;

  const match = parts[0];
  const hours = match.includes('h');

  return {
    match,
    value: parseInt(match.split(hours ? 'h' : 'm')[0], 10) * (hours ? 3600 : 60),
  };
};
