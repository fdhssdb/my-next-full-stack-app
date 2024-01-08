import React from 'react'
import AntdAdmin from '../_components/AntdAdmin'

function AdminLayout({children}) {
  return (
    <div className='admin-main'>
        <AntdAdmin>{children}</AntdAdmin>
    </div>
  )
}

export default AdminLayout