/**
 * @fileoverview Application route constants
 *
 * Centralized path definitions for routing throughout the application.
 * This helps maintain consistency and makes path updates easier.
 */

// Base paths for development and production
export const BASE_PATHS = {
  DEV: "",
  PROD: "/protfolio-rk",
} as const;

// Core application routes
export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  PROJECTS: "/projects",
  CONTACT: "/contact",
  SINGLE_PAGE: "/single-page",
} as const;

// Production routes (with basename prefix)
export const PROD_ROUTES = {
  HOME: "/protfolio-rk",
  ABOUT: "/protfolio-rk/about",
  PROJECTS: "/protfolio-rk/projects",
  CONTACT: "/protfolio-rk/contact",
  SINGLE_PAGE: "/protfolio-rk/single-page",
} as const;

// Helper function to get the appropriate route based on environment
export const getRoute = (route: keyof typeof ROUTES): string => {
  if (import.meta.env.PROD) {
    return PROD_ROUTES[route];
  }
  return ROUTES[route];
};

// Helper function to get basename for router
export const getBasename = (): string => {
  return import.meta.env.PROD ? BASE_PATHS.PROD : BASE_PATHS.DEV;
};

// Navigation items with their display labels
export const NAV_ITEMS = [
  { id: 0, path: ROUTES.HOME, label: "Home" },
  { id: 1, path: ROUTES.ABOUT, label: "About" },
  { id: 2, path: ROUTES.PROJECTS, label: "Projects" },
  { id: 3, path: ROUTES.CONTACT, label: "Contact" },
  { id: 4, path: ROUTES.SINGLE_PAGE, label: "Single Page" },
] as const;

// Production navigation items (for route matching)
export const PROD_NAV_ITEMS = [
  { id: 0, path: PROD_ROUTES.HOME, label: "Home" },
  { id: 1, path: PROD_ROUTES.ABOUT, label: "About" },
  { id: 2, path: PROD_ROUTES.PROJECTS, label: "Projects" },
  { id: 3, path: PROD_ROUTES.CONTACT, label: "Contact" },
  { id: 4, path: PROD_ROUTES.SINGLE_PAGE, label: "Single Page" },
] as const;

// Helper function to get navigation items based on environment
export const getNavItems = () => {
  return import.meta.env.PROD ? PROD_NAV_ITEMS : NAV_ITEMS;
};

// Type definitions
export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
