import { create } from 'zustand'
import type { FC, ReactNode } from 'react'

interface ModalOptions<TState = Record<string, unknown>> {
  outsideClick?: boolean
  modalActions?: boolean
  closeButton?: boolean
  additionalState?: TState
}
export interface ModalComponentProps<T> {
  onClose: (state?: Partial<T>) => void
  onConfirm: (state?: Partial<T>) => void
  onChangeState: (state: Partial<T>) => void
}
type CloseReason = 'confirm' | 'cancel'

interface State {
  open: boolean
  component: (props: ModalComponentProps<unknown>) => ReactNode
  modalOptions?: ModalOptions
  closeReason?: CloseReason
  closeModal: (reason: CloseReason) => void
  openModal: <T>(component: FC<ModalComponentProps<T>>, options?: ModalOptions) => void
  modalState: Record<string, unknown>
  updateModalState: (state: Record<string, unknown>) => void
}

const useStore = create<State>((set) => ({
  open: false,

  component: () => null,

  closeModal: (closeReason) => {
    set({ open: false, closeReason })
    set({ modalState: {} }) // I'll do it in a separate commit to return the original state, then I'll clean it
  },
  openModal: (component, modalOptions) => {
    set({ open: true, component, modalOptions })
  },

  modalState: {},
  updateModalState: (state) =>
    set(({ modalState }) => ({ modalState: { ...modalState, ...state } })),
}))

export const useModalStore = useStore

export type ModalResult<T> = { reason: 'cancel' } | { reason: 'confirm'; data: T }

export const useModal = <TProps>(component: FC<ModalComponentProps<TProps>>) => {
  const openModal = useStore((x) => x.openModal)
  return <TState = Record<string, unknown>>(options?: ModalOptions<TState>) => {
    openModal<TProps>(component, options as ModalOptions)

    return new Promise<ModalResult<TProps>>((resolve) => {
      useStore.subscribe(({ open, closeReason, modalState }) => {
        if (open) return
        if (closeReason === 'confirm') {
          resolve({ reason: closeReason, data: modalState as TProps })
        }
        if (closeReason === 'cancel') resolve({ reason: closeReason })
      })
    })
  }
}

export const useModalState = <T>() => useStore((x) => x.modalOptions?.additionalState) as Partial<T>
