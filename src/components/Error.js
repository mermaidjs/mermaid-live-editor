import React from 'react'

class Error extends React.Component {
  render () {
    const { match: { params: { base64 } } } = this.props
    const error = window.atob(base64)
    return <pre>{error}</pre>
  }
}

export default Error
