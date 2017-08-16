import React from 'react'

class Preview extends React.Component {
  render () {
    console.log('render Preview')
    return <div ref={div => { this.container = div }}>{this.props.code}</div>
  }
  componentDidMount () {
    console.log('Preview componentDidMount')
    window.mermaid.init(undefined, this.container)
  }
  componentDidUpdate () {
    console.log('Preview componentDidUpdate')
    this.container.removeAttribute('data-processed')
    this.container.innerHTML = this.props.code
    window.mermaid.init(undefined, this.container)
  }
}

export default Preview
