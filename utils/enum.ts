import { pipe } from '@/utils/pipe'
import { capitalize, lowerCase } from '@/utils/string'

const formatWord = pipe(lowerCase, capitalize)

export const formatEnumValue = (value: string) => value.split('_').map(formatWord).join(' ')
