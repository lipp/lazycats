import React from 'react'
import Head from 'next/head'
import 'isomorphic-fetch'
import IntersectionObservable from '../components/IntersectionObservable'
import ImageList from '../components/ImageList'
import LoadingIndicator from '../components/LoadingIndicator'

const fetchGifUrls = async (offset, limit) => {
  const endpoint = 'https://api.giphy.com/v1/gifs/search?api_key=d72eff4b2a41468ebecc3e910bf62fc3&q=cat&rating=G&lang=en'
  const response = await fetch(`${endpoint}&limit=${limit}&offset=${offset}`)
  const json = await response.json()
  return json.data.map(entry => ({
    smallUrl: entry.images.fixed_height_small_still.url,
    fullUrl: entry.images.fixed_height_downsampled.url
  }))
}


const chunkSize = 5

class Boxes extends React.Component {

  state = {
    boxes: this.props.boxes,
    index: this.props.index
  }

  static async getInitialProps ({req}) {
    const urls = await fetchGifUrls(0, chunkSize)
    return {
      boxes: urls,
      index: chunkSize
    }
  }

  componentDidMount () {
    require('intersection-observer')
  }

  loadMore = async ({isIntersecting}) => {
    if (this.loading || !isIntersecting) {
      return
    }
    this.loading = true
  
    console.log('load')
    const urls = await fetchGifUrls(this.state.index, chunkSize)
    this.setState({
      boxes: this.state.boxes.concat(urls),
      index: this.state.index + chunkSize
    }, () => this.loading = false)
  }

  render () {
    return (
      <div>
        <Head>
          <title>Cats</title>
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
        <ImageList images={this.state.boxes} />
        <IntersectionObservable onChange={this.loadMore} options={{threshold: [0, 1]}} >
          <LoadingIndicator />
        </IntersectionObservable>
        <style jsx global>{`
          body {margin: 0;}
        `}</style>
      </div>
    )
  }
}


export default Boxes

