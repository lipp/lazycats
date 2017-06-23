import Image from './Image'

const ImageList = ({images}) => (
  <ul>
    {images.map((urls, index) => <li key={index}><Image key={index} {...urls} /></li>)}
    <style jsx>{`
      ul {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 20px;
        padding: 0;
      }
      li {
        flex-grow: 1;
        flex-shrink: 1;
        max-width: 500px;
        min-width: 200px;
      }
    `}</style>
  </ul>
)

export default ImageList
