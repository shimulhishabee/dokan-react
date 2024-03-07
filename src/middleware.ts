// import { auth } from "./auth";
// import {
//   DEFAULT_LOGIN_REDIRECT,
//   apiAuthPrefix,
//   authRoutes,
//   publicRoutes,
//   rootRoute,
// } from "./routes";

// export default auth((req) => {
//   // req.auth

//   const { nextUrl } = req;
//   const isLoggedIn = !!req.auth;

//   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname);
//   const isRootRoute = nextUrl.pathname === rootRoute;

//   if (isApiAuthRoute) {
//     return;
//   }
//   if (isRootRoute) {
//     return Response.redirect(new URL("/auth", nextUrl));
//   }
//   if (isAuthRoute) {
//     if (isLoggedIn) {
//       return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//     }
//     return;
//   }

//   if (!isLoggedIn && !isPublicRoute) {
//     let callbackUrl = nextUrl.pathname;
//     if (nextUrl.search) {
//       callbackUrl += nextUrl.search;
//     }

//     const encodedCallbackUrl = encodeURIComponent(callbackUrl);

//     // return Response.redirect(new URL(`/auth`, nextUrl));
//   }

//   return;
// });

// // Optionally, don't invoke Middleware on some paths
// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

import createMiddleware from "next-intl/middleware";
import { auth } from "./auth";
import { locales } from "./navigation";

export default auth(
  createMiddleware({
    // A list of all locales that are supported
    locales: locales,
    localePrefix: "as-needed",
    defaultLocale: "en",
  })
);

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    "/",
    "/(bn|en)/:path*",
    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
