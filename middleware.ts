import { NextRequest, NextResponse } from "next/server"
import { authMiddleware } from "@clerk/nextjs"

const allowedOrigins = process.env.NODE_ENV === 'production'
    ? ['https://www.yoursite.com', 'https://yoursite.com']
    : ['http://localhost:3000', 'http://localhost:3001']

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: ["/api/:path*"],
});
// export function middleware(request: Request) {

//     const origin = request.headers.get('origin')

//     if (origin && !allowedOrigins.includes(origin)) {
//         return new NextResponse(null, {
//             status: 400,
//             statusText: "Bad Request",
//             headers: {
//                 'Content-Type': 'text/plain'
//             }
//         })
//     }

//     console.log('Middleware!')

//     return NextResponse.next()
// }

// export const config = {
//     matcher: '/api/:path*',
// }

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};