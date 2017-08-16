import React from 'react'
import { Row, Col, Input } from 'antd'
import { Route } from 'react-router-dom'

import Error from './Error'
import Preview from './Preview'

class Edit extends React.Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }
  onChange (event) {
    const base64 = window.btoa(event.target.value)
    const { history } = this.props
    history.push(`/edit/${base64}`)
  }
  render () {
    console.log('render Edit')
    const { match: { url, params: { editBase64 } } } = this.props
    const code = window.atob(editBase64)
    return <Row gutter={16}>
      <Col span={6}>
        <Input.TextArea ref={textArea => { this.textArea = textArea }} rows={16} value={code} onChange={this.onChange} />
      </Col>
      <Col span={18}>
        <Route exact path={url} render={() => <Preview code={code} />} />
        <Route path={url + '/error/:errorBase64'} component={Error} />
      </Col>
    </Row>
  }
}

export default Edit
