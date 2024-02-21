"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Table, Button, Card } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

function UsersPage() {
  const [list, setList] = useState([]);
  const [query, setQuery] = useState({ per: 10, page: 1, name: "" });

  useEffect(() => {
    fetch(`/api/admin/users?page=${query.page}&per=${query.per}&name=${query.name}`)
      .then((res) => res.json())
      .then((res) => console.log(res));
  }, [query]);

  return (
    <Card
      title="用户信息"
      extra={<Button icon={<PlusOutlined />} type="primary" />}
    >
      <Form layout="inline">
        <Form.Item label="名字">
          <Input placeholder="请输入名字" />
        </Form.Item>
        <Form.Item>
          <Button icon={<SearchOutlined />} type="primary"></Button>
        </Form.Item>
      </Form>
      <Table
        pagination={() => {}}
        dataSource={list}
        style={{ marginTop: "8px" }}
        columns={[
          {
            title: "序号",
          },
          {
            title: "名字",
          },
          {
            title: "头像",
          },
          {
            title: "手机号",
          },
          {
            title: "年龄",
          },
          {
            title: "性别",
          },
          {
            title: "操作",
          },
        ]}
      />
    </Card>
  );
}

export default UsersPage;
