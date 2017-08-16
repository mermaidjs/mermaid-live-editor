import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

class Preview extends React.Component {
  render () {
    const { code, match: { url } } = this.props
    return <div>
      <div ref={div => { this.container = div }}>{code}</div>
      <div className='separator' />
      <Button type='primary'><Link to={url.replace('/edit/', '/view/')}>Link to View</Link></Button>
      <Button type='primary'>Download SVG</Button>
    </div>
  }
  initMermaid () {
    const { code, history, match: { url } } = this.props
    if (window.mermaid.parse(code) || this.mermaidError === null) {
      window.mermaid.init(undefined, this.container)
    } else {
      const base64 = window.btoa(this.mermaidError)
      history.push(`${url}/error/${base64}`)
    }
  }
  componentDidMount () {
    this.mermaidError = null
    window.mermaid.parseError = (error, hash) => {
      this.mermaidError = error
    }
    this.initMermaid()
  }
  componentDidUpdate () {
    this.container.removeAttribute('data-processed')
    this.container.innerHTML = this.props.code
    this.initMermaid()
  }
}

export default Preview
