import React from 'react'

const ios = {}

const findIntersectionObserver = node => {
  let parent = node.parentElement
  let depth = 0
  while (parent && depth < 10) {
    ++depth
    if (parent.dataset.intersectionobserverid) {
      return ios[parent.dataset.intersectionobserverid]
    }
    parent = parent.parentElement
  }
}

class Observable extends React.PureComponent {
  _id = Observable._id++

  state = {}

  componentWillUnmount() {
    if (!this.isObserved) {
      return
    }
    const io = findIntersectionObserver(this.node)
    if (io) {
      io.unobserve(this.node)
    }
  }

  ref = node => {
    if (!node) {
      return
    }
    this.node = node
  }

  componentDidMount() {
    const io = findIntersectionObserver(this.node)
    if (io) {
      this.setState({ id: this._id }, () => {
        io.observe(this.node, this.props.onIntersectionChange)
        this.isObserved = true
      })
    }
  }

  render() {
    return (
      <div ref={this.ref} data-intersectionobservableid={this.state.id}>
        {this.props.children}
      </div>
    )
  }
}

Observable._id = 0

class Observer extends React.PureComponent {
  constructor(props) {
    super(props)
    if (typeof IntersectionObserver === 'undefined') {
      return
    }
    this.io = new IntersectionObserver(
      this.onIntersectionChange,
      this.props.options
    )
    this.callbacks = {}
    ios[this.props.id] = this
  }

  componentWillUnmount() {
    if (this.io) {
      this.io.disconnect()
    }
  }

  onIntersectionChange = entries => {
    if (this.props.onIntersectionChange) {
      this.props.onIntersectionChange(entries)
    }
    entries.forEach(entry => {
      const id = entry.target.dataset.intersectionobservableid
      if (this.callbacks[id]) {
        this.callbacks[id](entry)
      }
    })
  }

  observe = (element, onIntersectionChange) => {
    if (this.io) {
      this.callbacks[
        element.dataset.intersectionobservableid
      ] = onIntersectionChange
      this.io.observe(element)
    }
  }

  unobserve = element => {
    if (this.io) {
      delete this.callbacks[element.dataset.intersectionobservableid]
      this.io.unobserve(element)
    }
  }

  render() {
    const { children } = this.props
    const Element = this.props.element || 'div'
    return (
      <Element data-intersectionobserverid={this.props.id}>
        {children}
      </Element>
    )
  }
}

export { Observer, Observable }
