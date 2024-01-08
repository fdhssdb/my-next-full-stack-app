import React from "react";
import List from "./_components/List";

//可用于SEO
export const metadata = {
  title: "这是列表页",
  description: "这是一个用nextjs输出的列表页",
  keywords: "next.js, react",
};

function ListPage() {
  return (
    <div className="list-page">
      ListPage
      <List />
    </div>
  );
}

export default ListPage;
