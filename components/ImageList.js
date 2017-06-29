import Image from './Image'
import { Observer } from './IO'

const ImageList = ({ images }) =>
  <Observer options={{ threshold: [0.3] }} id="imagelist">
    <ul>
      {images.map((urls, index) =>
        <li key={index}>
          <Image key={index} {...urls} />
        </li>
      )}
    </ul>
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
  </Observer>

export default ImageList
