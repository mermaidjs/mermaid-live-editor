import React from 'react'

const View = ({match}) => (
  <div>
    <h2>View</h2>
    <pre>{window.atob(match.params.base64)}</pre>
  </div>
)

export default View
