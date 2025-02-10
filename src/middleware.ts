import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

interface Routes {
    [key: string]: boolean;
  }
const publicOnlyUrls: Routes = {
  // "/": true,
  "/login": true,
  "/create-account": true,
};
// app 디렉토리와 동일한 경로에 있어야 log가 나옴
// 예를 들어 src/middleware.ts 파일이 src 디렉토리에 있으면 안에 있어야 로그가 나옴
// src 디렉토리와 동일한 경로(root 경로)에 있으면 compile은 되는데 로그가 안나옴
export async function middleware(request: NextRequest) {
  console.log("middleware start");
  try {
    const session = await getSession();
    console.log("Session:", session);
    console.log("pathname:", request.nextUrl.pathname);
    // const isAuthPage = request.nextUrl.pathname.startsWith("/login") 
    // || request.nextUrl.pathname.startsWith("/create-account");
    const exists = publicOnlyUrls[request.nextUrl.pathname];
    console.log("Exists:", exists);
    console.log("Session ID exists:", !!session.id);

    if (!session.id) {
      console.log("No session ID, redirecting to login");
      if (!exists) {
        return NextResponse.redirect(new URL("/login", request.url));
      }else{
        // login or create-account page
        return NextResponse.next();
      }
    }
    if (session.id) {
      console.log("Session ID exists, redirecting to home");
      if (exists) {
        // login or create-account page
        return NextResponse.redirect(new URL("/", request.url));
      }else{
        // home page
        return NextResponse.next();
      }
    }
  } catch (error) {
    console.error("Error in middleware:", error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    // '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|serviceWorker).*)', // without the last trailing slash
  // '/'
  ],
}