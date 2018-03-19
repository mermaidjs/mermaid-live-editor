import React from 'react'
import mermaid from 'mermaid'

import { base64ToState } from '../utils'

class View extends React.Component {
  constructor (props) {
    super(props)
    const { match: { params: { base64 } }, location: { search } } = props
    this.state = base64ToState(base64, search)
  }

  render () {
    return <div ref={div => { this.container = div }}>{this.state.code}</div>
  }

  componentDidMount () {
    mermaid.initialize(this.state.mermaid)
    mermaid.init(undefined, this.container)
  }
}

export default View
