'use client'
import React from 'react'
import {Card} from 'antd';

function PageContainer({children, title}) {
  return (
    <Card title={title}>{children}</Card>
  )
}

export default PageContainer