/* eslint-env jest */

import React from 'react'
import { mount, configure } from 'enzyme'
import { Input } from 'antd'
import Adapter from 'enzyme-adapter-react-16'
import 'mermaid'

import App, { defaultCode } from '../src/components/App'

configure({ adapter: new Adapter() })

let wrapper = null
beforeEach(() => {
  wrapper = mount(<App />)
})

const verifyTextArea = (code) => {
  const textArea = wrapper.find(Input.TextArea).first()
  expect(textArea).toBeDefined()
  expect(textArea.props().value).toEqual(code)
}

const verifyLinks = (code) => {
  const links = wrapper.find('.marketing-links').find('li')
  expect(links.length).toEqual(4)
}

test('/', () => {
  verifyTextArea(defaultCode)
  verifyLinks(defaultCode)
})
