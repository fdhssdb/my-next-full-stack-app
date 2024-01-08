import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // 访问的如果是管理后台，我们可以在这里做判断
    if (!request.nextUrl.pathname.startsWith("/admin/login")) {
      //不是登陆页面的时候，判断是否登陆过
      if (request.cookies.get("admin-token")) {
        //已经登陆了，什么都不做
      } else {
        // 跳转到登录页
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    }
  }
  // return NextResponse.redirect(new URL('/home', request.url))
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/about/:path*',
// }
