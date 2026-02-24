import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

// The CONVEX_URL will be set when you run `npx convex dev`
// For now, we use a placeholder that can be overridden via env
const convexUrl = import.meta.env.VITE_CONVEX_URL;

const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  if (!convex) {
    // If no Convex URL is configured, render without provider
    // Components will fall back to mock data
    return <>{children}</>;
  }

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}

export { convex };
