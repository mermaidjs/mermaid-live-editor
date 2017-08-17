import React from 'react'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'
import { Base64 } from 'js-base64'

import Edit from './Edit'
import View from './View'

const defaultCode = `sequenceDiagram
A->> B: Query
B->> C: Forward query
Note right of C: Thinking...
C->> B: Response
B->> A: Forward response
`

class App extends React.Component {
  render () {
    return <Router>
      <div>
        <Route exact path='/' render={() => <Redirect to={`/edit/${Base64.encode(defaultCode)}`} />} />
        <Route path='/edit/:base64' component={Edit} />
        <Route path='/view/:base64' component={View} />
      </div>
    </Router>
  }
}

export default App
