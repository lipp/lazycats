import Image from './Image'

const ImageList = ({images}) => (
  <div>
    {images.map((urls, index) => <Image key={index} {...urls} />)}
  </div>
)

export default ImageList
