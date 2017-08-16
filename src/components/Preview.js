import React from 'react'

class Preview extends React.Component {
  render () {
    console.log('render Preview')
    return <div ref={div => { this.container = div }}>{this.props.code}</div>
  }
  initMermaid () {
    if (window.mermaid.parse(this.props.code) || this.mermaidError === null) {
      window.mermaid.init(undefined, this.container)
    } else {
      const { history, match: { url } } = this.props
      const base64 = window.btoa(this.mermaidError)
      history.push(`${url}/error/${base64}`)
    }
  }
  componentDidMount () {
    console.log('Preview componentDidMount')
    this.mermaidError = null
    window.mermaid.parseError = (error, hash) => {
      this.mermaidError = error
    }
    this.initMermaid()
  }
  componentDidUpdate () {
    console.log('Preview componentDidUpdate')
    this.container.removeAttribute('data-processed')
    this.container.innerHTML = this.props.code
    this.initMermaid()
  }
}

export default Preview
