import Image from 'next/image'

interface NFTCard {
  id: string
  imageURL: string
  imageDimension: number
}

const NFTCard = ({ id, imageURL, imageDimension } : NFTCard) => {
  return (
    <div className={`flex p-0.5 justify-self-center flex-col cursor-pointer rounded-lg max-w-[200px] transition ease-in-out duration-300 hover:bg-indigo-600 hover:text-white`}>
      <Image src={imageURL} width={imageDimension} height={imageDimension} alt={id} />
      <div className='p-2 flex justify-center'>
        <div>#{id}</div>
      </div>
    </div>
  )
}

export default NFTCard
