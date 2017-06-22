import React from 'react'


class IntersectionObservable extends React.Component {

  componentDidMount () {
    this.observer = new IntersectionObserver(this.observe, this.props.options)
    this.observer.observe(this.node)
  }

  componentWillUnmount () {
    this.observer.unobserve(this.node)
  }

  observe = entries => {
    this.props.onChange(entries[0])
  }

  render () {
    const {children} = this.props
    return <div ref={node => this.node = node} >{children}</div>
  }
}

const threshold = [...(Array(1000).keys())].map(index => index / 1000)

const fetchGifUrls = async offset => {
  const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=d72eff4b2a41468ebecc3e910bf62fc3&q=cat&limit=10&offset=${offset}&rating=G&lang=en`)
  const json = await response.json()
  return json.data.map(entry => entry.images.fixed_height.url)
}

class Box extends React.Component {

  state = {
    opacity: 1
  }

  setOpacity = ({intersectionRatio}) => {
    this.setState({opacity: intersectionRatio})
  }

  render () {
    return (
      <IntersectionObservable onChange={this.setOpacity} options={{threshold}} >
        <div style={{height: 400, background: 'black', color: 'white', opacity: this.state.opacity}} >
          <img src={this.props.url} />
        </div>
      </IntersectionObservable>
    )
  }
}


class Boxes extends React.Component {
    state = {
      boxes: [],
      index: 0
    }

  componentDidMount () {
    this.loadMore({isIntersecting: true})
  }


  loadMore = ({isIntersecting}) => {
    if (this.loading || !isIntersecting) {
      return
    }
    this.loading = true
    console.log('load more')
  
    fetchGifUrls(this.state.index)
      .then(urls => {
        this.setState({
          boxes: this.state.boxes.concat(urls),
          index: this.state.index + 10
        }, () => this.loading = false)
      })
  }
  render () {
    return (
      <div>
        {this.state.boxes.map((url, key) => <img key={key} src={url} style={{height: 300}} />)}
        <IntersectionObservable onChange={this.loadMore} options={{threshold: [0]}} >
          <div style={{height: 300, background: 'red'}} />
        </IntersectionObservable>
      </div>
    )
  }
}


export default () => <Boxes />

