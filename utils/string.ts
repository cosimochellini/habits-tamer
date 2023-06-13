export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export const lowerCase = (str: string) => str.toLowerCase()

export const remove = (value: string) => (string: string) => string.replace(value, '')
