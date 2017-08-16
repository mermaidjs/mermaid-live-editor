import React from 'react'
import { HashRouter as Router, Route, NavLink, Redirect } from 'react-router-dom'

import Edit from './Edit'
import View from './View'

class App extends React.Component {
  render () {
    console.log('render App')
    return <Router>
      <div>
        <ul>
          <li><NavLink activeClassName='activeLink' to='/edit/c2VxdWVuY2VEaWFncmFtCkEtPj4gQjogUXVlcnkKQi0+PiBDOiBGb3J3YXJkIHF1ZXJ5Ck5vdGUgcmlnaHQgb2YgQzogVGhpbmtpbmcuLi4KQy0+PiBCOiBSZXNwb25zZQpCLT4+IEE6IEZvcndhcmQgcmVzcG9uc2U='>Edit</NavLink></li>
          <li><NavLink activeClassName='activeLink' to='/view/c2VxdWVuY2VEaWFncmFtCkEtPj4gQjogUXVlcnkKQi0+PiBDOiBGb3J3YXJkIHF1ZXJ5Ck5vdGUgcmlnaHQgb2YgQzogVGhpbmtpbmcuLi4KQy0+PiBCOiBSZXNwb25zZQpCLT4+IEE6IEZvcndhcmQgcmVzcG9uc2U='>View</NavLink></li>
          <li><NavLink activeClassName='activeLink' to='/edit/c2VxdWVuY2VEaWFncmFtCkEtPj4gQjogUXVlcnkKQi0+PiBDOiBGb3J3YXJkIHF1ZXJ5Ck5vdGUgcmlnaHQgb2YgQzogVGhpbmtpbmcuLi4KQy0+PiBCOiBSZXNwb25zZQpCLT4+IEE6IEZvcndhcmQgcmVzcG9uc2U=/error/UGFyc2UgZXJyb3Igb24gbGluZSAxOgpzZXF1ZW5jZURpYWdyYW1mZHNBCl4KRXhwZWN0aW5nICdTUEFDRScsICdOTCcsICdTRCcsIGdvdCAnQUNUT1'>Error</NavLink></li>
        </ul>

        <div className='separator' />
        <Route exact path='/' render={() => <Redirect to={`/edit/c2VxdWVuY2VEaWFncmFtCkEtPj4gQjogUXVlcnkKQi0+PiBDOiBGb3J3YXJkIHF1ZXJ5Ck5vdGUgcmlnaHQgb2YgQzogVGhpbmtpbmcuLi4KQy0+PiBCOiBSZXNwb25zZQpCLT4+IEE6IEZvcndhcmQgcmVzcG9uc2U=`} />} />
        <Route path='/edit/:editBase64' component={Edit} />
        <Route path='/view/:viewBase64' component={View} />
      </div>
    </Router>
  }
}

export default App
