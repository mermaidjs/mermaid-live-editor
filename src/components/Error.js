import React from 'react'
import { Base64 } from 'js-base64'

class Error extends React.Component {
  render () {
    const { match: { params: { base64 } } } = this.props
    const error = Base64.decode(base64)
    return <pre>{error}</pre>
  }
}

export default Error
