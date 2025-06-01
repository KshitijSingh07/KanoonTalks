import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const publicRoutes = createRouteMatcher([
  '/',                // home
  '/public(.*)',      // public folder or public pages
  '/blogs(.*)',       // blogs and subpaths
  // '/create(.*)',      // create page(s)
  '/sign-in(.*)',     // sign-in pages
  '/sign-up(.*)',     // sign-up pages
  '/about(.*)',
  '/terms(.*)',
  '/privacy(.*)',
  '/refund-policy(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (!publicRoutes(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
