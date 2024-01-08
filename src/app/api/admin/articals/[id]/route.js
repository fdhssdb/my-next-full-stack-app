import prisma from "@/db";
import { NextResponse } from "next/server";

//params中的id是路由[id]中传的参数
export const PUT = async (req, { params }) => {
  const { id } = params;
  const data = await req.json(); //请求体中传递的数据
  await prisma.articals.update({
    where: { id },
    data,
  });
  return NextResponse.json({
    success: true,
    errorMessage: "修改成功",
  });
};

export const DELETE = async (req, { params }) => {
  const { id } = params;
  await prisma.articals.delete({
    where: { id },
  });
  return NextResponse.json({
    success: true,
    errorMessage: "删除成功",
  });
};
