export default (seconds) => {
  let format = '';

  const date = new Date(null);
  date.setSeconds(seconds);
  const h = date.getUTCHours();
  const m = date.getUTCMinutes();
  const s = date.getUTCSeconds();

  if (h > 0) format += `${h}h`;
  if (m > 0) format += `${m}'`;
  if (s > 0) format += `${s}"`;

  return format;
};
