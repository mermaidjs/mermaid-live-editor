import React from 'react'
import { Base64 } from 'js-base64'
import mermaid from 'mermaid'

class View extends React.Component {
  render () {
    const { match: { params: { base64 } } } = this.props
    const code = Base64.decode(base64)
    return <div ref={div => { this.container = div }}>{code}</div>
  }

  componentDidMount () {
    mermaid.init(undefined, this.container)
  }
}

export default View
