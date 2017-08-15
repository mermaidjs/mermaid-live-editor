import React from 'react'
import {Row, Col, Input} from 'antd'

const Edit = ({ match }) => (
  <Row gutter={16}>
    <Col span={6}>
      <Input.TextArea rows={16} />
    </Col>
    <Col span={18}>
      <div />
    </Col>
  </Row>
)

export default Edit
