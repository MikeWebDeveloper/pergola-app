import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Add any routes you want to be publicly accessible.
  // By default, all routes are protected.
  // For example, you can make the homepage and API routes public.
  publicRoutes: ["/", "/api/configurations"],
});

export const config = {
  // The following matcher runs middleware on all routes
  // except for static assets and special Next.js paths.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}; 