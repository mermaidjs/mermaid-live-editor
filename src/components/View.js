import React from 'react'
import mermaid from 'mermaid'

import { base64ToState } from '../utils'

class View extends React.Component {
  constructor (props) {
    super(props)
    const {
      match: {
        params: { base64 }
      },
      location: { search }
    } = props
    this.json = base64ToState(base64, search)
  }

  render () {
    return (
      <div
        ref={div => {
          this.container = div
        }}
      >
        {this.json.code}
      </div>
    )
  }

  componentDidMount () {
    mermaid.initialize(this.json.mermaid)
    mermaid.init(undefined, this.container)
  }
}

export default View
