import React from "react";

function AdminLayout({ children }) {
  return (
    <div className="demo-admin p-8 bg-rose-600 text-white">
      <h4>这是一个admin中间的内容</h4>
      {children}
    </div>
  );
}

export default AdminLayout;
