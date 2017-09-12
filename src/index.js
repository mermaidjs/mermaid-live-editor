import React from 'react'
import ReactDOM from 'react-dom'
import 'mermaid'

import App from './components/App'
import './index.css'

window.mermaid_config = { theme: 'forest' }

ReactDOM.render(<App />, document.getElementById('root'))
