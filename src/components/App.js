import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'

import Edit from './Edit'
import View from './View'
import Error from './Error'

const App = () => (
  <Router>
    <div>
      <ul>
        <li><Link to='/c2VxdWVuY2VEaWFncmFtCkEtPj4gQjogUXVlcnkKQi0+PiBDOiBGb3J3YXJkIHF1ZXJ5Ck5vdGUgcmlnaHQgb2YgQzogVGhpbmtpbmcuLi4KQy0+PiBCOiBSZXNwb25zZQpCLT4+IEE6IEZvcndhcmQgcmVzcG9uc2U='>Edit</Link></li>
        <li><Link to='/view/c2VxdWVuY2VEaWFncmFtCkEtPj4gQjogUXVlcnkKQi0+PiBDOiBGb3J3YXJkIHF1ZXJ5Ck5vdGUgcmlnaHQgb2YgQzogVGhpbmtpbmcuLi4KQy0+PiBCOiBSZXNwb25zZQpCLT4+IEE6IEZvcndhcmQgcmVzcG9uc2U='>View</Link></li>
        <li><Link to='/error/UGFyc2UgZXJyb3Igb24gbGluZSAxOgpzZXF1ZW5jZURpYWdyYW1mZHNBCl4KRXhwZWN0aW5nICdTUEFDRScsICdOTCcsICdTRCcsIGdvdCAnQUNUT1In'>Error</Link></li>
      </ul>

      <div className='separator' />
      <Route exact path='/:base64' component={Edit} />
      <Route path='/view/:base64' component={View} />
      <Route path='/error/:base64' component={Error} />
    </div>
  </Router>
)

export default App
