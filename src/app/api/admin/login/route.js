import { NextRequest, NextResponse } from "next/server";

export const POST = (request) => {
  return NextResponse.json(
    {
      success: true,
      errorMessage: "登录成功",
    },
    {
      headers: {
        'Set-cookie': 'admin-token=123; Path=/',
      },
    }
  );
};
