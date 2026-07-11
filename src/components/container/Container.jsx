import React from 'react'

function Container({children}) {
  return (
    <div className="container md:px-4 px-1">
      {children}
    </div>
  )
}

export default Container
