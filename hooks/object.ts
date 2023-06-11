import { useReducer } from 'react'

export const useObjectState = <T extends Record<string, unknown>>(initialState: Partial<T> = {}) =>
  useReducer((state: Partial<T>, action: Partial<T>) => ({ ...state, ...action }), initialState)
