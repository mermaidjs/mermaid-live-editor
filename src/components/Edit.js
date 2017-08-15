import React from 'react'
import { Row, Col, Input } from 'antd'
import { Route } from 'react-router-dom'

import Error from './Error'

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
    const { match: { params: { base64 } } } = this.props
    const code = window.atob(base64)
    return <Row gutter={16}>
      <Col span={6}>
        <Input.TextArea rows={16} value={code} onChange={this.onChange} />
      </Col>
      <Col span={18}>
        <div ref={div => { this.container = div }}>{code}</div>
        <Route path='/edit/:base64/error' component={Error} />
      </Col>
    </Row>
  }
  componentDidMount () {
    window.mermaid.init(undefined, this.container)
  }
  componentDidUpdate () {
    this.container.removeAttribute('data-processed')
    window.mermaid.init(undefined, this.container)
  }
}

export default Edit
