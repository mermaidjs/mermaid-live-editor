import React from 'react'

class Error extends React.Component {
  render () {
    console.log('render Error')
    const { match: { params: { errorBase64 } } } = this.props
    const error = window.atob(errorBase64)
    return <pre>{error}</pre>
  }
}

export default Error
