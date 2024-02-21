import prisma from "@/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  let per = req.nextUrl.searchParams.get("per") * 1 || 10;
  let page = req.nextUrl.searchParams.get("page") * 1 || 1;
  let name = req.nextUrl.searchParams.get("name") || "";
  const data = await prisma.users.findMany({
    where: {
      name: {
        contains: name, //模糊查询
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: per, //取多少条数据
    skip: (page - 1) * per, //跳过
  });
  const total = await prisma.users.count({
    where: {
      name: {
        contains: name, //模糊查询
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
