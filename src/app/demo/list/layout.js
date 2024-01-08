import React from 'react'

function ListLayout({children}) {
  return (
    <div className='demo'>
        <h3>这是list页面的模板</h3>
        <hr/>
        {children}
    </div>
  )
}

export default ListLayout