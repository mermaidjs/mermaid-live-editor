import React from 'react'
import { Row, Col, Input, Icon, Tag, Affix, Select, Card, Divider } from 'antd'
import { Route } from 'react-router-dom'
import { Base64 } from 'js-base64'
import mermaid from 'mermaid'

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
    this.onCodeChange = this.onCodeChange.bind(this)
    this.onThemeChange = this.onThemeChange.bind(this)

    const search = props.location.search
    const params = new window.URLSearchParams(search)
    const theme = params.get('theme') || 'default'
    this.state = {
      theme
    }
    mermaid.initialize({ theme, logLevel: 3 })
  }

  onCodeChange (event) {
    const { history, match: { path } } = this.props
    let base64 = Base64.encodeURI(event.target.value)
    if (base64 === '') {
      base64 = 'blank'
    }
    history.push(path.replace(':base64', base64))
  }

  onThemeChange (value) {
    const { history, match: { path, params: { base64 } } } = this.props
    if (value === 'default') {
      history.push(path.replace(':base64', base64))
    } else {
      history.push(path.replace(':base64', base64) + `?theme=${value}`)
    }
    window.location.reload(false)
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
              <Input.TextArea autosize={{ minRows: 4, maxRows: 16 }} value={code} onChange={this.onCodeChange} />
            </Card>
          </Affix>
          <Card title='Theme'>
            <Select style={{ width: '100%' }} value={this.state.theme} onChange={this.onThemeChange}>
              <Select.Option value='default'>default</Select.Option>
              <Select.Option value='forest'>forest</Select.Option>
              <Select.Option value='dark'>dark</Select.Option>
              <Select.Option value='neutral'>neutral</Select.Option>
            </Select>
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
