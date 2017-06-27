import React from 'react'
import {Observable} from './IntersectionObservable'

export default class Image extends React.Component {

  state = {
    url: this.props.smallUrl
  }

  loadFullUrl = ({intersectionRatio}) => {
    this.intersectionRatio = intersectionRatio
    if (intersectionRatio > 0.3 && this.state.url !== this.props.fullUrl) {
      if (!this.timer) {
        this.timer = setTimeout(() => {
          if (this.intersectionRatio > 0.3) {
            this.setState({url: this.props.fullUrl})
          }
          delete this.timer
        }, 1000)
      }
    }
  }

  render () {
    return (
      <Observable onIntersectionChange={this.loadFullUrl} >
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
      </Observable>
    )
  }
}

