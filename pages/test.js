import { Observer, Observable } from '../components/IntersectionObservable'

const Box = ({ opacity, color, children }) =>
  <div
    style={{
      position: 'relative',
      height: '50vh',
      width: '100vh'
    }}
  >
    <div
      style={{
        background: color,
        opacity: opacity,
        height: '100%',
        width: '100%',
        position: 'absolute',
        transform: `translate3d(${(1 - opacity) * 100}%, 0, 0)`,
        transition: 'all 0.2s linear'
      }}
    >
      {children}
    </div>
  </div>

const thresholdSteps = 100
const threshold = [...Array(thresholdSteps + 1).keys()].map(
  x => x / thresholdSteps
)

export default class Foo extends React.Component {
  state = {
    black: 0,
    green: 0,
    red: 0,
    yellow: 0,
    orange: 0,
    purple: 0,
    magenta: 0,
    cyan: 0
  }

  setText = which => ({ intersectionRatio }) => {
    this.setState({ [which]: Math.max(this.state[which], intersectionRatio) })
  }

  render() {
    return (
      <div data-xyz="ddd">
        <Observer options={{ threshold }} id="foo">
          {Object.keys(this.state).map(color =>
            <Observable key={color} onIntersectionChange={this.setText(color)}>
              <Box color={color} opacity={this.state[color]} />
            </Observable>
          )}
          <Box color="white" opacity={1}>
            <Observable
              onIntersectionChange={({ intersectionRatio }) =>
                this.setState({ xx: intersectionRatio })}
            >
              <h1>
                {this.state.xx}
              </h1>
            </Observable>
          </Box>
        </Observer>
        <style jsx global>{`
          body {
            margin: 0;
          }
        `}</style>
      </div>
    )
  }
}
