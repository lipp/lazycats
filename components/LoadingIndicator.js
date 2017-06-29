import { Observer, Observable } from '../components/IO'

export default ({ onVisible }) =>
  <Observer options={{ threshold: [0, 1] }} id='loader'>
    <Observable onIntersectionChange={onVisible}>
      <div>
        <style jsx>{`
          div {
            height: 200px;
            min-width: 100vw;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </div>
    </Observable>
  </Observer>
