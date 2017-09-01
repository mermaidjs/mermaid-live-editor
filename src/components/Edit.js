import React from 'react'
import { Row, Col, Input, Icon } from 'antd'
import { Route } from 'react-router-dom'
import { Base64 } from 'js-base64'

import Error from './Error'
import Preview from './Preview'

class Edit extends React.Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }
  onChange (event) {
    const { history, match: { path } } = this.props
    const base64 = Base64.encode(event.target.value)
    history.push(path.replace(':base64', base64))
  }
  render () {
    const { match: { url, params: { base64 } } } = this.props
    const code = Base64.decode(base64)
    return <div>
      <h1>Mermaid Live Editor</h1>
      <div className='separator' />
      <Row gutter={16}>
        <Col span={6}>
          <Input.TextArea rows={16} value={code} onChange={this.onChange} />
          <div className='separator' />
          <ul className='marketing-links'>
            <li><a href='https://mermaidjs.github.io/' target='_blank'><Icon type='book' /> Mermaid Documentation</a></li>
            <li><a href='https://github.com/knsv/mermaid' target='_blank'><Icon type='github' /> Mermaid on GitHub</a></li>
            <li><a href='https://github.com/mermaidjs/mermaid-live-editor' target='_blank'><Icon type='github' /> Live Editor on GitHub</a></li>
          </ul>
        </Col>
        <Col span={18}>
          <Route exact path={url} render={(props) => <Preview {...props} code={code} />} />
          <Route path={url + '/error/:base64'} component={Error} />
        </Col>
      </Row>
    </div>
  }
}

export default Edit
