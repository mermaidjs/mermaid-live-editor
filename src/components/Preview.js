import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import moment from 'moment'

class Preview extends React.Component {
  constructor (props) {
    super(props)
    this.onDownloadSVG = this.onDownloadSVG.bind(this)
  }
  onDownloadSVG (event) {
    event.target.href = `data:image/png;base64,${window.btoa(this.container.innerHTML)}`
    event.target.download = `mermaid-diagram-${moment().format('YYYYMMDDHHmmss')}.svg`
  }
  render () {
    const { code, match: { url } } = this.props
    return <div>
      <div ref={div => { this.container = div }}>{code}</div>
      <div className='separator' />
      <Button type='primary'><Link to={url.replace('/edit/', '/view/')}>Link to View</Link></Button>
      <Button type='primary'><a href='' download='' onClick={this.onDownloadSVG}>Download SVG</a></Button>
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
