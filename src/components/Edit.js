import React from 'react'
import { Row, Col, Input, Icon, Tag, Affix, Card, Divider, Button } from 'antd'
import { Route } from 'react-router-dom'
import { Base64 } from 'js-base64'
import mermaid from 'mermaid'

import Error from './Error'
import Preview from './Preview'
import pkg from '../../package.json'
import { base64ToState } from '../utils'

let mermaidVersion = pkg.dependencies.mermaid
if (mermaidVersion[0] === '^') {
  mermaidVersion = mermaidVersion.substring(1)
}

const startingDuration = 1500
const startingLineOfAnimation = 2 // i think it should be 1 but it breaks for some reason.
const startingFrame = 0

class Edit extends React.Component {
  constructor (props) {
    super(props)
    this.onCodeChange = this.onCodeChange.bind(this)
    this.onMermaidConfigChange = this.onMermaidConfigChange.bind(this)
    this.getLastFrame = this.getLastFrame.bind(this)
    this.handleStart = this.handleStart.bind(this)
    this.handleEnd = this.handleEnd.bind(this)
    this.handlePreviousFrame = this.handlePreviousFrame.bind(this)
    this.handleNextFrame = this.handleNextFrame.bind(this)
    this.handleAnimation = this.handleAnimation.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
    this.handlePause = this.handlePause.bind(this)
    this.handleDurationChange = this.handleDurationChange.bind(this)

    const { match: { params: { base64 } }, location: { search } } = this.props
    this.json = base64ToState(base64, search)
    mermaid.initialize(this.json.mermaid)

    this.state = {
      frame: this.json.code.split('\n').length - startingLineOfAnimation - 1,
      frameDuration: startingDuration,
      playing: false
    }
  }

  componentWillUnmount () {
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout)
      this.animationTimeout = null
    }
  }

  onCodeChange (event) {
    const { history, match: { path } } = this.props
    this.json.code = event.target.value
    const base64 = Base64.encodeURI(JSON.stringify(this.json))
    history.push(path.replace(':base64', base64))
    this.setState({ playing: false, frame: startingFrame })
  }

  onMermaidConfigChange (event) {
    const str = event.target.value
    const { history, match: { path, url } } = this.props
    try {
      const config = JSON.parse(str)
      mermaid.initialize(config)
      this.json.mermaid = config
      const base64 = Base64.encodeURI(JSON.stringify(this.json))
      history.push(path.replace(':base64', base64))
    } catch (e) {
      const base64 = Base64.encodeURI(e.message)
      history.push(`${url}/error/${base64}`)
    }
  }

  getLastFrame () {
    return this.json.code.split('\n').length - startingLineOfAnimation - 1
  }

  handleStart () {
    this.setState({ frame: startingFrame })
  }

  handleEnd () {
    this.setState({ frame: this.getLastFrame() })
  }

  handlePreviousFrame () {
    this.setState(({ frame }) => {
      if (frame <= startingFrame) {
        return
      }
      return { frame: frame - 1 }
    })
  }

  handleNextFrame () {
    this.setState(({ frame }) => {
      if (frame >= this.getLastFrame()) {
        return
      }
      return { frame: frame + 1 }
    })
  }

  handleAnimation () {
    const { frame, frameDuration } = this.state
    if (frame >= this.getLastFrame()) {
      this.handlePause()
      return
    }
    this.animationTimeout = setTimeout(() => {
      this.handleNextFrame()
      this.handleAnimation()
    }, frameDuration)
  }

  handlePlay () {
    const { frame } = this.state
    if (this.animationTimeout) {
      this.handlePause()
      return
    }
    if (frame >= this.getLastFrame()) {
      this.setState({ frame: startingFrame, playing: true }, () => this.handleAnimation())
    } else {
      this.setState({ playing: true })
      this.handleAnimation()
    }
  }

  handlePause () {
    clearTimeout(this.animationTimeout)
    this.animationTimeout = null
    this.setState({ playing: false })
  }

  handleDurationChange (evt) {
    this.setState({ frameDuration: evt.target.value })
  }

  render () {
    const { match: { url } } = this.props
    const { frame, frameDuration, playing } = this.state
    return <div>
      <h1>Mermaid Live Editor</h1>
      <Divider />
      <Row gutter={16}>
        <Col span={8}>
          <Affix>
            <Card title='Code'>
              <Input.TextArea autosize={{ minRows: 4, maxRows: 16 }} value={this.json.code} onChange={this.onCodeChange} />
            </Card>
          </Affix>
          <Card title='Animation Controls'>
            <div>
              <Button onClick={this.handleStart}>{'<<'}</Button>
              {' '}<Button onClick={this.handlePreviousFrame}>{'<'}</Button>
              {' '}<Button onClick={playing ? this.handlePause : this.handlePlay}>{playing ? 'Pause' : 'Play'}</Button>
              {' '}<Button onClick={this.handleNextFrame}>{'>'}</Button>
              {' '}<Button onClick={this.handleEnd}>{'>>'}</Button>
            </div>
            <div>Frame Duration: <Input type='number' step='100' value={frameDuration} onChange={this.handleDurationChange} /></div>
          </Card>
          <Card title='Mermaid configuration'>
            <Input.TextArea autosize={{ minRows: 4, maxRows: 16 }} defaultValue={JSON.stringify(this.json.mermaid, null, 2)} onChange={this.onMermaidConfigChange} />
          </Card>
          <Card title='Links'>
            <ul className='marketing-links'>
              <li><a href='https://mermaidjs.github.io/' target='_blank'><Icon type='book' /> Mermaid Documentation</a></li>
              <li><a href='https://github.com/knsv/mermaid' target='_blank'><Icon type='github' /> Mermaid on GitHub</a></li>
              <li><a href='https://github.com/mermaidjs/mermaid-gitbook' target='_blank'><Icon type='github' /> Documentation on GitHub</a></li>
              <li><a href='https://github.com/mermaidjs/mermaid-live-editor' target='_blank'><Icon type='github' /> Live Editor on GitHub</a></li>
              <li><a href='https://github.com/mermaidjs/mermaid.cli' target='_blank'><Icon type='github' /> Mermaid CLI</a></li>
            </ul>
          </Card>
        </Col>
        <Col span={16}>
          <Route exact path={url} render={(props) => <Preview {...props} code={this.json.code.split('\n').slice(0, startingLineOfAnimation + frame).join('\n')} />} />
          <Route path={url + '/error/:base64'} component={Error} />
          <h3 style={{ textAlign: 'right' }}>Powered by mermaid <Tag color='green'>{mermaidVersion}</Tag></h3>
        </Col>
      </Row>
    </div>
  }
}

export default Edit
