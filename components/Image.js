import React from 'react'
import IntersectionObservable from './IntersectionObservable'

export default class Image extends React.Component {

  state = {
    url: this.props.smallUrl
  }

  loadFullUrl = ({intersectionRatio}) => {
    if (intersectionRatio > 0 && this.state.url !== this.props.fullUrl) {
      this.setState({url: this.props.fullUrl})
    }
  }

  render () {
    return (
      <IntersectionObservable onChange={this.loadFullUrl} options={{threshold: [0]}} >
        <div>
          <img src={this.state.url} />
        </div>
        <style jsx>{`
          div {
            height: 30vh;
          }
          img {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
        `}</style>
      </IntersectionObservable>
    )
  }
}

