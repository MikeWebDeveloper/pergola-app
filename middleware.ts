import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  publicRoutes: ["/", "/api/configurations"],
});

export const config = {
  // The following matcher runs middleware on all routes
  // except for static assets and special Next.js paths.
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}; 