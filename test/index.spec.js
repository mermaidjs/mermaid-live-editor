/* eslint-env jest */

import React from 'react'
import { mount, configure } from 'enzyme'
import { Input } from 'antd'
import { Base64 } from 'js-base64'
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
  const links = wrapper.find('.links').find('a')
  expect(links.length).toEqual(2)
  expect(links.at(0).props().children).toEqual('Link to View')
  expect(links.at(0).props().href).toEqual('#/view/' + Base64.encodeURI(code))
  expect(links.at(1).props().children).toEqual('Download SVG')
}

test('/', () => {
  verifyTextArea(defaultCode)
  verifyLinks(defaultCode)
})
