import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="Nasıl Oynanır?" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        5 harfli kelimeyi 6 denemede bulun. Her tahminden sonra, karoların rengi tahmininizin
        kelimeye ne kadar yakın olduğunu göstermek için değişecektir.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="G" status="correct" />
        <Cell value="İ" />
        <Cell value="Z" />
        <Cell value="L" />
        <Cell value="İ" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        G harfi kelimede var ve doğru yerdedir.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="S" />
        <Cell value="A" />
        <Cell value="H" status="present" />
        <Cell value="İ" />
        <Cell value="L" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        H harfi kelimede var fakat yanlış yerdedir.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="B" />
        <Cell value="A" />
        <Cell value="T" />
        <Cell value="I" status="absent" />
        <Cell value="K" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        I harfi kelimede yoktur.
      </p>
    </BaseModal>
  )
}
