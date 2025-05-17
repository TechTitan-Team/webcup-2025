import React from 'react'
import Stairs from '../../common/TransitionPage/Stairs/Stairs'

const Layout = ({ children }) => {
  return (
    <Stairs>
        {children}
    </Stairs>
  )
}

export default Layout