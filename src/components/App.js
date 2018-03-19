import React from 'react'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { Base64 } from 'js-base64'

import Edit from './Edit'
import View from './View'
import { defaultState } from '../utils'

class App extends React.Component {
  render () {
    return <Router>
      <Switch>
        <Route exact path='/' render={() => <Redirect to={`/edit/${Base64.encodeURI(JSON.stringify(defaultState))}`} />} />
        <Route path='/edit/:base64' component={Edit} />
        <Route path='/view/:base64' component={View} />
      </Switch>
    </Router>
  }
}

export default App
