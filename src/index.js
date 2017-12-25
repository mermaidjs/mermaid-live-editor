import React from 'react'
import ReactDOM from 'react-dom'
import mermaid from 'mermaid'
import 'antd/dist/antd.css'

import App from './components/App'
import './index.css'

mermaid.initialize({ theme: 'forest' })

ReactDOM.render(<App />, document.getElementById('root'))
