import React from 'react'

export default class IntersectionObservable extends React.Component {

  componentDidMount () {
    require('intersection-observer')
    this.io = new IntersectionObserver(this.observe, this.props.options)
    this.io.observe(this.node)
  }

  componentWillUnmount () {
    this.io.disconnect()
  }

  observe = entries => {
    this.props.onChange(entries[0])
  }

  render () {
    const {children} = this.props
    return <div ref={node => this.node = node} >{children}</div>
  }
}

