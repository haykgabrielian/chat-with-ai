import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';

import About from '@/pages/About';
import Authentication from '@/pages/Authentication';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';

const rootRoute = createRootRoute({
  component: () => (
    <div>
      <Outlet />
    </div>
  ),
  notFoundComponent: NotFound,
});

const HomeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const AboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
});

const AuthenticationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/authentication',
  component: Authentication,
});

const routeTree = rootRoute.addChildren([
  AboutRoute,
  HomeRoute,
  AuthenticationRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default router;
