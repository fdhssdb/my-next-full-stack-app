import React from 'react'

//动态生成metadata
export async function generateMetadata({params, searchParams}){
    return {
        title: '这是详情页--' + params.id,
    }
}

function ListDetailPage({params, searchParams}) {
  return (
    <div>ListDetailPage-{params.id}, query--{searchParams.name}</div>
  )
}

export default ListDetailPage