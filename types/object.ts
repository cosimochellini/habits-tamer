export const typedObjectEntries: <T extends Record<string, unknown>>(
  obj: T,
) => [keyof T, T[keyof T]][] = Object.entries

export const typedObjectKeys: <T extends Record<string, unknown>>(obj: T) => (keyof T)[] =
  Object.keys

export const typedObjectValues: <T extends Record<string, unknown>>(obj: T) => T[keyof T][] =
  Object.values
