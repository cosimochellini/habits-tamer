import { useEffect, useRef } from 'react'

import { useModalStore } from '@/store/modal'

const closeButton = (
  <button type='submit' className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
    ✕
  </button>
)
export const ModalProvider = () => {
  const modalRef = useRef<HTMLDialogElement>(null)
  const { component: Component, modalOptions, closeModal, open, updateModalState } = useModalStore()

  const onModalClose = (data?: Record<string, unknown>) => {
    updateModalState(data ?? {})
    closeModal('cancel')
  }

  const onConfirm = (data?: Record<string, unknown>) => {
    updateModalState(data ?? {})
    closeModal('confirm')
  }

  useEffect(() => {
    if (!modalRef.current) return

    if (modalRef.current.open && !open) modalRef.current.close()

    if (!modalRef.current.open && open) modalRef.current.showModal()
  }, [open])

  return (
    <dialog ref={modalRef} className='modal'>
      <form method='dialog' className='modal-box' onSubmit={() => onModalClose()}>
        {modalOptions?.closeButton && closeButton}

        <Component onClose={onModalClose} onConfirm={onConfirm} onChangeState={updateModalState} />

        {modalOptions?.modalActions && (
          <div className='modal-action'>
            <button type='button' onClick={() => onModalClose()} className='btn btn-warning'>
              Close
            </button>
            <button type='button' onClick={() => onConfirm()} className='btn btn-accent'>
              Confirm
            </button>
          </div>
        )}
      </form>

      {modalOptions?.outsideClick && (
        <form method='dialog' className='modal-backdrop' onSubmit={() => onModalClose()}>
          <button type='submit'>close</button>
        </form>
      )}
    </dialog>
  )
}
