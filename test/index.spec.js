/* eslint-env jest */

import React from 'react'
import { mount } from 'enzyme'
import { Input, Button } from 'antd'
import { Link } from 'react-router-dom'

import 'mermaid'
import App, { defaultCode } from '../src/components/App'

let wrapper = null

const verifyButtons = () => {
  const buttons = wrapper.find(Button)
  expect(buttons.length).toEqual(2)
  const link = buttons.at(0).find(Link).first()
  expect(link.props().children).toEqual('Link to View')
  const a = buttons.at(1).find('a').first()
  expect(a.props().children).toEqual('Download SVG')
}

const verifyTextArea = (text) => {
  const textArea = wrapper.find(Input.TextArea).first()
  expect(textArea).toBeDefined()
  expect(textArea.props().value).toEqual(text)
}

beforeEach(() => {
  wrapper = mount(<App />)
})

test('/', () => {
  verifyTextArea(defaultCode)
  verifyButtons()
})
