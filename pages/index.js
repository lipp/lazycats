import React from 'react'
import Head from 'next/head'
import 'isomorphic-fetch'
import {Observer, Observable} from '../components/IntersectionObservable'
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


const chunkSize = 20

class Boxes extends React.Component {

  state = {
    gifs: this.props.gifs,
    index: this.props.index
  }

  static async getInitialProps ({req}) {
    const urls = await fetchGifUrls(0, chunkSize)
    return {
      gifs: urls,
      index: chunkSize
    }
  }

  loadMore = async ({intersectionRatio}) => {
    if (this.loading || intersectionRatio === 0) {
      return
    }
    this.loading = true
  
    const urls = await fetchGifUrls(this.state.index, chunkSize)
    this.setState({
      gifs: this.state.gifs.concat(urls),
      index: this.state.index + chunkSize
    }, () => this.loading = false)
  }

  render () {
    return (
      <div>
        <Head>
          <title>Cats</title>
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <script src="https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver"></script>
        </Head>
        <ImageList images={this.state.gifs} />
        <Observer options={{threshold: [0, 1]}} id='loader'>
          <Observable onIntersectionChange={this.loadMore} >
            <LoadingIndicator />
          </Observable>
        </Observer>
        <style jsx global>{`
          body {
            margin: 0;
            background: black;
          }
        `}</style>
      </div>
    )
  }
}


export default Boxes

