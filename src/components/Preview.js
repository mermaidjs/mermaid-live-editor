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
    event.target.href = `data:image/svg+xml;base64,${Base64.encode(this.container.innerHTML)}`
    event.target.download = `mermaid-diagram-${moment().format('YYYYMMDDHHmmss')}.svg`
  }
  render () {
    const { code, match: { url } } = this.props
    return <div>
      <div ref={div => {this.error = div}}></div>
      <div ref={div => { this.container = div }}>{code}</div>
      <div className='separator' />
      <Button type='primary'><a href='' download='' onClick={this.onDownloadSVG}>Download SVG</a></Button>
    </div>
  }
  initMermaid () {
    const { code, history, match: { url } } = this.props
    try {
      this.setError('')
      mermaid.parse(code)
      mermaid.init(undefined, this.container)
    } catch ({str, hash}) {
      this.setError(str)
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

  setError(str){
    //data model bound will make Stack Overflow so just set the real dom value
    this.error.innerHTML = `<pre>` + str + `</pre>`
  }
}

export default Preview
