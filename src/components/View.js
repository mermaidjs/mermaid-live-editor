import React from 'react'
import mermaid from 'mermaid'

import { base64ToState } from '../utils'

class View extends React.Component {
  constructor (props) {
    super(props)
    const { match: { params: { base64 } } } = props
    this.state = base64ToState(base64)
  }

  render () {
    return <div ref={div => { this.container = div }}>{this.state.code}</div>
  }

  componentDidMount () {
    mermaid.initialize({ theme: this.state.theme, logLevel: 3 })
    mermaid.init(undefined, this.container)
  }
}

export default View
