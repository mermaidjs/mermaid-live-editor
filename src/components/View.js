import React from 'react'

class View extends React.Component {
  render () {
    const { match } = this.props
    return (
      <div>
        <h2>View</h2>
        <div ref={div => { this.mermaidContainer = div }}>{window.atob(match.params.base64)}</div>
      </div>
    )
  }

  componentDidMount () {
    window.mermaid.init(undefined, this.mermaidContainer)
  }
}

export default View
