import { pipe } from '@/utils/pipe'
import { capitalize, lowerCase, nullable, remove, replace } from '@/utils/string'

const formatWord = pipe(lowerCase, capitalize)

export const formatEnumValue = (value: string) => value.split('_').map(formatWord).join(' ')

export const formatFrequency = pipe(nullable, lowerCase, remove('ly'), replace('i', 'y'))
