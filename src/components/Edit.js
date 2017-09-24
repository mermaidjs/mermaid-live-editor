import React from 'react'
import { Row, Col, Input, Icon, Tag, Affix } from 'antd'
import { Route } from 'react-router-dom'
import { Base64 } from 'js-base64'
import Fetch from 'whatwg-fetch'

import Error from './Error'
import Preview from './Preview'
import pkg from '../../package.json'
import io from 'socket.io-client'
import Config from './Config'

const socket = io(Config.endpoint, {})

let mermaidVersion = pkg.dependencies.mermaid
if (mermaidVersion[0] === '^') {
  mermaidVersion = mermaidVersion.substring(1)
}

class Edit extends React.Component {
  constructor(props) {
    super(props)
    let _this = this
    this.state = {code: `graph TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[Car]
    `}

    socket.on('sync', function (msg) {
      _this.setState({code: msg})
      try {
        mermaid.parse(code)
        mermaid.init(undefined, this.container)
      } catch ({ str, hash }) {
        return <pre>str</pre>
      }
    })

    this.onChange = this.onChange.bind(this)
  }
  componentDidMount(){
    var _this = this;
    fetch(Config.endpoint + "/data")
    .then(function(response){
      return response.text()
    }).then(function(body){
      if(body){
        _this.setState({ code: body })
      }
    })
  }
  
  onChange(event) {
    var _this = this
    this.setState({
      code: event.target.value
    })

    socket.emit('save', event.target.value)
  }
  render() {
    const { match: { url, params: { base64 } } } = this.props
    // const code = this.state.code
    // const code = base64 === 'blank' ? '' : Base64.decode(base64)
    return <div>
      <h1>Mermaid Live Editor</h1>
      <div className='separator' />
      <Row gutter={16}>
        <Col span={6}>
          <Affix>
            <Input.TextArea rows={16} value={this.state.code} onChange={this.onChange} />
          </Affix>
          <div className='separator' />
          <ul className='marketing-links'>
            <li><a href='https://mermaidjs.github.io/' target='_blank'><Icon type='book' /> Mermaid Documentation</a></li>
            <li><a href='https://github.com/knsv/mermaid' target='_blank'><Icon type='github' /> Mermaid on GitHub</a></li>
            <li><a href='https://github.com/mermaidjs/mermaid-gitbook' target='_blank'><Icon type='github' /> Documentation on GitHub</a></li>
            <li><a href='https://github.com/mermaidjs/mermaid-live-editor' target='_blank'><Icon type='github' /> Live Editor on GitHub</a></li>
          </ul>
          <div className='separator' />
          <h3>Powered by mermaid <Tag color='green'>{mermaidVersion}</Tag></h3>
        </Col>
        <Col span={18}>
          <Route exact path={url} render={(props) => <Preview {...props} code={this.state.code} />} />
          <Route path={url + '/error/:base64'} component={Error} />
        </Col>
      </Row>
    </div>
  }
}

export default Edit
