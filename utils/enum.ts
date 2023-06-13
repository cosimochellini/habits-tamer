import { pipe } from '@/utils/pipe'
import { capitalize, lowerCase, remove } from '@/utils/string'

const formatWord = pipe(lowerCase, capitalize)

export const formatEnumValue = (value: string) => value.split('_').map(formatWord).join(' ')

export const formatFrequency = pipe(lowerCase, remove('ly'))
