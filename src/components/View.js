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
    const search = this.props.location.search
    const params = new window.URLSearchParams(search)
    const theme = params.get('theme') || 'default'
    mermaid.initialize({ theme, logLevel: 3 })
    mermaid.init(undefined, this.container)
  }
}

export default View
