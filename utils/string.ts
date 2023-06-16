export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export const lowerCase = (str: string) => str.toLowerCase()

export const remove = (value: string) => (string: string) => string.replace(value, '')

export const replace = (value: string, replace: string) => (string: string) =>
  string.replace(value, replace)

export const nullable = (str: string | null | undefined) => str ?? ''
