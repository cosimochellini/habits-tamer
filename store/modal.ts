import { create } from 'zustand'
import type { ReactNode } from 'react'

interface ModalOptions {
  outsideClick?: boolean
  modalActions?: boolean
  closeButton?: boolean
}

type CloseReason = 'confirm' | 'cancel'

interface State {
  open: boolean
  component: () => ReactNode
  modalOptions?: ModalOptions
  closeReason?: CloseReason
  closeModal: (reason: CloseReason) => void
  openModal: (component: () => ReactNode, options?: ModalOptions) => void
}

const useStore = create<State>((set) => ({
  open: false,

  component: () => null,
  closeModal: (closeReason) => {
    set({ open: false, closeReason })
  },
  openModal: (component, modalOptions) => {
    set({ open: true, component, modalOptions })
  },
}))

export const useModalStore = useStore

export const useModal = (component: () => ReactNode) => {
  const openModal = useStore((x) => x.openModal)

  return (options?: ModalOptions) => {
    openModal(component, options)

    return new Promise<CloseReason>((resolve) => {
      useStore.subscribe(({ open, closeReason }) => {
        if (!open && !!closeReason) resolve(closeReason)
      })
    })
  }
}
