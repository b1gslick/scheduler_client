export const convertMinsToHrsMins = (mins: any) => {
  let h: any = Math.floor(mins / 60);
  let m: any = mins % 60;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  return `${h}:${m}`;
};
