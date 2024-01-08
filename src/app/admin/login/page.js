"use client";
import { Card, Form, Button, Input } from "antd";
import { useRouter } from "next/navigation";

function LoginPage() {
  const nav = useRouter();
  return (
    <div className="login-form pt-40">
      <Card title="Next全栈管理后台" className="w-2/5 mx-auto" style={{margin: "0 auto"}}> 
        <Form
          labelCol={{ span: 3 }}
          onFinish={async (val) => {
            const res = await fetch("/api/admin/login", {
              method: "POST",
              body: JSON.stringify(val),
            }).then((res) => res.json());
            console.log(res);
            nav.push("/admin/dashboard");
          }}
        >
          <Form.Item name="userName" label="用户名">
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item name="password" label="用户名">
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default LoginPage;
