import React from 'react'

function DemoLayout({children}) {
  return (
    <div className='demo'>
        <h2>这是demo页面的模板</h2>
        <hr/>
        {children}
    </div>
  )
}

export default DemoLayout