export const range = (value: number, start = 0) =>
  new Array(value).fill('').map((_, index) => index + start)
