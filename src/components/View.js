import React from 'react'

class View extends React.Component {
  render () {
    console.log('render View')
    const { match: { params: { base64 } } } = this.props
    const code = window.atob(base64)
    return <div ref={div => { this.container = div }}>{code}</div>
  }

  componentDidMount () {
    console.log('View componentDidMount')
    window.mermaid.init(undefined, this.container)
  }
}

export default View
