import React from 'react'
import { Base64 } from 'js-base64'
import mermaid from 'mermaid'

const base64ToState = base64 => {
  // for backward compatibility
  const search = this.props.location.search
  const params = new window.URLSearchParams(search)
  const themeFromUrl = params.get('theme') || 'default'

  const str = Base64.decode(base64)
  let state
  try {
    state = JSON.parse(str)
    if (state.code === undefined) { // not valid json
      state = { code: str, theme: themeFromUrl }
    }
  } catch (e) {
    state = { code: str, theme: themeFromUrl }
  }
  return state
}

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
