import React from 'react'
import { Row, Col, Input } from 'antd'

class Edit extends React.Component {
  render () {
    const { match: { params: { base64 } } } = this.props
    const code = window.atob(base64)
    return <Row gutter={16}>
      <Col span={6}>
        <Input.TextArea rows={16} value={code} />
      </Col>
      <Col span={18}>
        <div ref={div => { this.container = div }}>{code}</div>
      </Col>
    </Row>
  }
  componentDidMount () {
    window.mermaid.init(undefined, this.container)
  }
  componentDidUpdate () {
    window.mermaid.init(undefined, this.container)
  }
}

export default Edit
