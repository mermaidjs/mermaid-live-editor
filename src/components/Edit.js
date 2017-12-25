import React from 'react'
import { Row, Col, Input, Icon, Tag, Affix, Select, Card, Divider } from 'antd'
import { Route } from 'react-router-dom'
import { Base64 } from 'js-base64'

import Error from './Error'
import Preview from './Preview'
import pkg from '../../package.json'

let mermaidVersion = pkg.dependencies.mermaid
if (mermaidVersion[0] === '^') {
  mermaidVersion = mermaidVersion.substring(1)
}

class Edit extends React.Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange (event) {
    const { history, match: { path } } = this.props
    let base64 = Base64.encodeURI(event.target.value)
    if (base64 === '') {
      base64 = 'blank'
    }
    history.push(path.replace(':base64', base64))
  }

  render () {
    const { match: { url, params: { base64 } } } = this.props
    const code = base64 === 'blank' ? '' : Base64.decode(base64)
    return <div>
      <h1>Mermaid Live Editor</h1>
      <Divider />
      <Row gutter={16}>
        <Col span={8}>
          <Affix>
            <Card title='Code'>
              <Input.TextArea rows={16} value={code} onChange={this.onChange} />
            </Card>
          </Affix>
          <Card title='Theme'>
            <Select style={{ width: '100%' }}><Select.Option value='default'>default</Select.Option></Select>
          </Card>
          <Card title='Links'>
            <ul className='marketing-links'>
              <li><a href='https://mermaidjs.github.io/' target='_blank'><Icon type='book' /> Mermaid Documentation</a></li>
              <li><a href='https://github.com/knsv/mermaid' target='_blank'><Icon type='github' /> Mermaid on GitHub</a></li>
              <li><a href='https://github.com/mermaidjs/mermaid-gitbook' target='_blank'><Icon type='github' /> Documentation on GitHub</a></li>
              <li><a href='https://github.com/mermaidjs/mermaid-live-editor' target='_blank'><Icon type='github' /> Live Editor on GitHub</a></li>
            </ul>
          </Card>
        </Col>
        <Col span={16}>
          <Route exact path={url} render={(props) => <Preview {...props} code={code} />} />
          <Route path={url + '/error/:base64'} component={Error} />
          <h3 style={{ textAlign: 'right' }}>Powered by mermaid <Tag color='green'>{mermaidVersion}</Tag></h3>
        </Col>
      </Row>
    </div>
  }
}

export default Edit
