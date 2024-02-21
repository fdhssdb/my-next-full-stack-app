"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Table,
  Modal,
  Space,
  Popconfirm,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import dynamic from "next/dynamic";
import MyUpload from "../../_components/MyUpload";

//只在客户端中引入富文本编译器，不在代码编译的时候做处理
const MyEditor = dynamic(() => import("../../_components/MyEditor"), {
  ssr: false,
});

function ArticalPage() {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  const [myForm] = Form.useForm(); //获取Form组件
  const [imageUrl, setImageUrl] = useState("");

  // 编辑器内容
  const [html, setHtml] = useState("");

  const [query, setQuery] = useState({ per: 10, page: 1, title: "" });

  const [currentId, setCurrentId] = useState(""); //使用一个当前id变量，表示是新增还是修改
  //如果存在表示修改，不存在表示新增

  const [total, setTotal] = useState(0);

  //监听查询条件的改变，条件改变后重新取数据
  useEffect(() => {
    fetch(
      `/api/admin/articals?page=${query.page}&per=${query.per}&title=${query.title}`
    )
      .then((res) => res.json())
      .then((res) => {
        setList(res.data.list);
        setTotal(res.data.total);
      });
  }, [query]);

  useEffect(() => {
    if (!open) {
      setCurrentId("");
      setImageUrl("");
      setHtml("");
    }
  }, [open]);

  return (
    <Card
      title="文章管理"
      extra={
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => setOpen(true)}
        />
      }
    >
      <Form
        name="searchForm"
        layout="inline"
        onFinish={(val) => {
          setQuery({ page: 1, per: 10, title: val.title });
        }}
      >
        <Form.Item label="标题" name="title">
          <Input placeholder="请输入关键词" />
        </Form.Item>
        <Form.Item>
          <Button icon={<SearchOutlined />} type="primary" htmlType="submit" />
        </Form.Item>
      </Form>
      <Table
        pagination={{
          total: total,
          onChange: (page) => {
            setQuery({ ...query, page, per: 10, title: "" });
          },
        }}
        style={{ marginTop: "8px" }}
        dataSource={list}
        rowKey="id"
        columns={[
          {
            title: "序号",
            width: 80,
            render: (value, record, index) => {
              return index + 1;
            },
          },
          { title: "标题", dataIndex: "title" },
          {
            title: "封面",
            align: "center",
            width: "100px",
            render: (value, record, index) => {
              return (
                <img
                  src={record.image}
                  alt={record.title}
                  style={{
                    display: "block",
                    margin: "8px auto",
                    width: "80px",
                    maxHeight: "80px",
                  }}
                />
              );
            },
          },
          { title: "简介", dataIndex: "desc" },
          {
            title: "操作",
            render: (value, record, index) => (
              <Space>
                <Button
                  size="small"
                  icon={<EditOutlined />}
                  type="primary"
                  onClick={() => {
                    setOpen(true);
                    setCurrentId(record.id);
                    setImageUrl(record.image);
                    setHtml(record.content);
                    //myForm.setFieldsValue(record);
                  }}
                />
                <Popconfirm
                  title="是否确认删除"
                  onConfirm={async () => {
                    await fetch("/api/admin/articals/" + record.id, {
                      method: "DELETE",
                    }).then((res) => res.json());
                    setQuery({ ...query, per: 10, page: 1 }); //重置查询条件，重新获取数据
                  }}
                >
                  <Button
                    size="small"
                    icon={<DeleteOutlined />}
                    type="primary"
                    danger
                  />
                </Popconfirm>
              </Space>
            ),
          },
        ]}
      />

      {/* Modal和 Form 一起配合使用时，设置 destroyOnClose 也不会在 Modal
      关闭时销毁表单字段数据，需要设置 <Form preserve={false} />。 */}
      <Modal
        title="编辑"
        width={"70vw"}
        style={{ top: 30 }}
        open={open}
        destroyOnClose={true} //关闭窗口之后销毁
        maskClosable={false} //点击空白区域时不关闭
        onCancel={() => {
          setOpen(false);
        }}
        onOk={() => {
          myForm.submit();
        }}
      >
        <Form
          name="editForm"
          layout="vertical"
          form={myForm}
          preserve={false} //和Modal结合使用的时候需要加上它，否则不会销毁
          onFinish={async (val) => {
            // 此处需要调用接口
            if (currentId) {
              //修改
              await fetch("/api/admin/articals/" + currentId, {
                method: "PUT",
                body: JSON.stringify({
                  ...val,
                  image: imageUrl,
                  content: html,
                }),
              }).then((res) => res.json());
            } else {
              //新增
              await fetch("/api/admin/articals", {
                method: "POST",
                body: JSON.stringify({
                  ...val,
                  image: imageUrl,
                  content: html,
                }),
              }).then((res) => console.log(res));
            }
            setOpen(false);
            setQuery({ ...query }); //改变query会重新取数据
          }}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[
              {
                required: true,
                message: "标题不能为空",
              },
            ]}
          >
            <Input placeholder="请输入标题" />
          </Form.Item>
          <Form.Item label="简介" name="desc">
            <Input.TextArea placeholder="请输入简介" />
          </Form.Item>
          <Form.Item label="封面">
            <MyUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
          </Form.Item>
          <Form.Item>
            <MyEditor label="详情" html={html} setHtml={setHtml} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}

export default ArticalPage;
