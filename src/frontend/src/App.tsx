import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Wrench } from "lucide-react";
import HomePage from "./pages/HomePage";
import ServiceFormPage from "./pages/ServiceFormPage";

const queryClient = new QueryClient();

// Layout
function RootLayout() {
  const year = new Date().getFullYear();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-foreground text-white sticky top-0 z-40 border-b border-white/10">
        <div className="container max-w-5xl flex items-center justify-between h-16">
          <Link
            to="/"
            data-ocid="nav.link"
            className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Wrench
                className="w-4 h-4 text-primary-foreground"
                strokeWidth={2.5}
              />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">
              GOA Service Centres
            </span>
          </Link>
          <div className="text-white/50 text-sm hidden sm:block">
            📞 &nbsp;
            <a
              href="tel:+919876543210"
              className="hover:text-primary transition-colors"
            >
              +91 98765 43210
            </a>
          </div>
        </div>
      </header>

      <div className="flex-1">
        <Outlet />
      </div>

      <footer className="bg-foreground text-white/50 border-t border-white/10 py-6">
        <div className="container max-w-5xl text-center text-sm">
          © {year}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}

// Routes
const rootRoute = createRootRoute({ component: RootLayout });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const serviceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/service/$serviceName",
  component: ServiceFormPage,
});

const routeTree = rootRoute.addChildren([homeRoute, serviceRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster position="top-center" richColors />
    </QueryClientProvider>
  );
}
