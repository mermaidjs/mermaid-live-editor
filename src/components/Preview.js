import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Base64 } from 'js-base64'
import mermaid from 'mermaid'

class Preview extends React.Component {
  constructor (props) {
    super(props)
    this.onDownloadSVG = this.onDownloadSVG.bind(this)
  }
  onDownloadSVG (event) {
    event.preventDefault()
    const link = document.createElement('a')
    link.setAttribute('type', 'hidden')
    link.download = `mermaid-diagram-${moment().format('YYYYMMDDHHmmss')}.svg`
    link.href = `data:image/svg+xml;base64,${Base64.encode(this.container.innerHTML)}`
    document.body.appendChild(link)
    link.click()
  }
  render () {
    const { code, match: { url } } = this.props
    return <div>
      <div ref={div => { this.container = div }}>{code}</div>
      <div className='separator' />
      <Button type='primary'><Link to={url.replace('/edit/', '/view/')}>Link to View</Link></Button>
      <Button type='primary' onClick={this.onDownloadSVG}>Download SVG</Button>
    </div>
  }
  initMermaid () {
    const { code, history, match: { url } } = this.props
    try {
      mermaid.parse(code)
      mermaid.init(undefined, this.container)
    } catch ({str, hash}) {
      const base64 = Base64.encodeURI(str)
      history.push(`${url}/error/${base64}`)
    }
  }
  componentDidMount () {
    this.initMermaid()
  }
  componentDidUpdate () {
    this.container.removeAttribute('data-processed')
    this.container.innerHTML = this.props.code
    this.initMermaid()
  }
}

export default Preview
