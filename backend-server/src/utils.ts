export const getTime = (startTime: Date) => {
  const _start = new Date(startTime).getTime();
  const _end = new Date().getTime();
  const diff = Math.abs(_start - _end);
  return Math.floor(diff / 1000);
};
