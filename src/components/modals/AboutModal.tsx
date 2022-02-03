import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const AboutModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="About" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Bu oyun açık kodlu bir oyundur -{' '}
        <a
          href="https://github.com/MRSteeLion/wordle"
          className="underline font-bold"
        >
          kodu buradan kontrol edin
        </a>{' '}
      </p>
    </BaseModal>
  )
}
