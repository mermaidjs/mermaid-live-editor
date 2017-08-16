import React from 'react'

class Error extends React.Component {
  render () {
    console.log('render Error')
    const { match: { params: { base64 } } } = this.props
    const error = window.atob(base64)
    return <pre>{error}</pre>
  }
}

export default Error
