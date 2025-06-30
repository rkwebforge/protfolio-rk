/**
 * @fileoverview Application route constants
 *
 * Centralized path definitions for routing throughout the application.
 * This helps maintain consistency and makes path updates easier.
 *
 * NOTE: When using React Router with basename, all routes should be relative.
 * The basename is handled by the router configuration.
 */

// Base paths for development and production
export const BASE_PATHS = {
  DEV: "",
  PROD: "/protfolio-rk",
} as const;

// Core application routes (always relative when using basename)
export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  PROJECTS: "/projects",
  CONTACT: "/contact",
  SINGLE_PAGE: "/single-page",
} as const;

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

// Type definitions
export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
