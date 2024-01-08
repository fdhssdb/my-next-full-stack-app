import prisma from "@/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  let per = req.nextUrl.searchParams.get("per") * 1 || 10;
  let page = req.nextUrl.searchParams.get("page") * 1 || 1;
  let title = req.nextUrl.searchParams.get("title") || "";
  const data = await prisma.articals.findMany({
    where: {
      title: {
        contains: title, //模糊查询
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: per, //取多少条数据
    skip: (page - 1) * per, //跳过
  });
  const total = await prisma.articals.count({
    where: {
      title: {
        contains: title, //模糊查询
      },
    },
  });

  return NextResponse.json({
    success: true,
    errorMessage: "",
    data: {
      list: data,
      pages: Math.ceil(total / per),
      total,
    },
  });
};

//post请求
export const POST = async (req) => {
  const data = await req.json(); //获取请求体中传递的json数据
  await prisma.articals.create({
    data,
  }); //创建数据
  return NextResponse.json({
    success: true,
    errorMessage: "创建成功",
    data: {},
  });
};
