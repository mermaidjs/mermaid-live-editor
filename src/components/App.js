import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'

import Home from './Home'
import About from './About'
import Topics from './Topics'

const App = () => (
  <Router>
    <div>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/topics'>Topics</Link></li>
      </ul>

      <div className='separator' />

      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route path='/topics' component={Topics} />
    </div>
  </Router>
)

export default App
