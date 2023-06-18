import { useReducer } from 'react'

export const useObjectState = <T>(initialState: Partial<T> = {}) =>
  useReducer((state: Partial<T>, action: Partial<T>) => ({ ...state, ...action }), initialState)
