import { useEffect, useRef } from 'react'

import { useModalStore } from '@/store/modal'

const closeButton = (
  <button type='submit' className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
    ✕
  </button>
)
export const ModalProvider = () => {
  const { component, modalOptions, closeModal, open } = useModalStore()
  const modalRef = useRef<HTMLDialogElement>(null)

  const onModalClose = () => {
    closeModal('cancel')
  }

  const onConfirm = () => {
    closeModal('confirm')
  }

  useEffect(() => {
    if (!modalRef.current) return

    if (modalRef.current.open && !open) modalRef.current.close()

    if (!modalRef.current.open && open) modalRef.current.showModal()
  }, [open])

  return (
    <dialog ref={modalRef} className='modal'>
      <form method='dialog' className='modal-box' onSubmit={onModalClose}>
        {modalOptions?.closeButton && closeButton}

        {component()}

        {modalOptions?.modalActions && (
          <div className='modal-action'>
            <button type='button' onClick={onModalClose} className='btn btn-warning'>
              Close
            </button>
            <button type='button' onClick={onConfirm} className='btn btn-accent'>
              Confirm
            </button>
          </div>
        )}
      </form>

      {modalOptions?.outsideClick && (
        <form method='dialog' className='modal-backdrop' onSubmit={onModalClose}>
          <button type='submit'>close</button>
        </form>
      )}
    </dialog>
  )
}
