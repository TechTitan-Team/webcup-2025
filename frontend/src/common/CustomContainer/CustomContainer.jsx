import React from 'react'

const CustomContainer = ({ children, className }) => {
  return (
    <div className={`px-12 ${className}`}>
        {children}
    </div>
  )
}

export default CustomContainer