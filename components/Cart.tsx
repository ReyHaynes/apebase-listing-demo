import { ReactNode } from 'react'
import { NFT } from '../models/NFT'

interface Cart {
  cartData: NFT[]
  onClearAllClick: () => void
  children: ReactNode
}

const Cart = ({ cartData, onClearAllClick, children }: Cart) => {
  return (
    <>
     <header className='flex flex-row items-center mb-2'>
      <h1 className='text-xl ml-2 font-semibold content-center mr-4'>My Cart ({cartData.length})</h1>
        { cartData.length && 
          <button
            className='bg-gray-300 text-black hover:bg-red-600 hover:text-white transition-[color,background] p-1 text-xs rounded-md'
            onClick={onClearAllClick}
          >
            Clear All
          </button>
        }
      </header>
      <div className="flex overflow-x-auto">
        { children }
      </div>
    </>
  )
}

export default Cart
