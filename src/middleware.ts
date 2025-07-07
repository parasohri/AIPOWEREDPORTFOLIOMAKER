// import { auth, clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
// import { NextResponse } from 'next/server';
 
// const isPublicRoute = createRouteMatcher([
//     "/sign-in",
//     "/sign-up",
     
//     "/Front",
//     "/Edit-portfolio"
// ])
// const isPublicApiRoute = createRouteMatcher([
//     "/api/fileupload",
//     "/api/geminiai"
// ])


// export default clerkMiddleware(async(auth, req) => {
    
//     const {userId} = await auth();
//     const currentUrl = new URL(req.url)
//      const isAccessingDashboard = currentUrl.pathname === "/home"
//      const isApiRequest = currentUrl.pathname.startsWith("/api")

//      // If user is logged in and accessing a public route but not the dashboard
//     // if(userId && isPublicRoute(req) && !isAccessingDashboard) {
//     //     return NextResponse.redirect(new URL("/home", req.url))
//     // }
//     //not logged in
//     if(!userId){
//         // If user is not logged in and trying to access a protected route
//         if(!isPublicRoute(req) && !isPublicApiRoute(req) ){
//             return NextResponse.redirect(new URL("/sign-in", req.url))
//         }

//         // If the request is for a protected API and the user is not logged in
//         if(isApiRequest && !isPublicApiRoute(req)){
//             return NextResponse.redirect(new URL("/sign-in", req.url))
//         }
//     }
//     return NextResponse.next()

// })

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };
import { auth, clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Static public routes
const publicRoutes = [
  "/sign-in",
  "/sign-up",
  "/Front",
  "/Edit-portfolio",
  "/Dashboard",
  "/choosetemplate",
  "/sample-portfolios",
];

// Public route patterns (e.g., dynamic ones)
const isPublicRoute = (req: Request) => {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // Allow exact matches
  if (publicRoutes.includes(pathname)) return true;

  // Allow dynamic route: /portfolio/:id
  if (/^\/portfolio\/[^\/]+$/.test(pathname)) return true;
  if (/^\/portfoliotwo\/[^\/]+$/.test(pathname)) return true;
  return false;
};

// Public API routes
const publicApiRoutes = [
  "/api/fileupload",
  "/api/geminiai",
  "/api/fetchdata"
];

const isPublicApiRoute = (req: Request) => {
  const url = new URL(req.url);
  const pathname = url.pathname;

  return publicApiRoutes.includes(pathname);
};

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const url = new URL(req.url);
  const pathname = url.pathname;const currentUrl = new URL(req.url)
 const isAccessingDashboard = currentUrl.pathname === "/Dashboard"
  const isApiRequest = pathname.startsWith("/api");
//  if(userId && isPublicRoute(req) && !isAccessingDashboard) {
//         return NextResponse.redirect(new URL("/Dashboard", req.url))
//     }
  // Unauthenticated user trying to access protected routes
//   if (!userId && !isPublicRoute(req)) {
//   const signInUrl = new URL('/sign-in', req.url);
//   signInUrl.searchParams.set('redirect_url', currentUrl.pathname); // e.g., /dashboard
//   return NextResponse.redirect(signInUrl);
// }

  if (!userId) {
    if (!isPublicRoute(req) && !isPublicApiRoute(req)) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    if (isApiRequest && !isPublicApiRoute(req)) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
