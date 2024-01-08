import { NextResponse } from "next/server";

export const GET = (req, { params }) => {
  return NextResponse.json({
    success: true,
    errorMessage: "获取单条记录:" + params.id,
    data: [
      {
        id: 1,
        name: "叶兰",
      },
      {
        id: 2,
        name: "星球",
      }
    ],
  });
};
