export const shuffle = <T>(items: T[] | undefined) =>
  (items ?? [])
    .concat()
    .sort(() => 0.5 - Math.random())
    .slice(0, 4)
