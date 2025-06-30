# Path Constants

This document explains the path constants system implemented in the portfolio application.

## Overview

All routing paths have been centralized in `/src/constants/paths.ts` to maintain consistency and make path updates easier across the application.

## Structure

### Base Paths

```typescript
export const BASE_PATHS = {
  DEV: "",
  PROD: "/protfolio-rk",
} as const;
```

### Route Constants

```typescript
export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  PROJECTS: "/projects",
  CONTACT: "/contact",
  SINGLE_PAGE: "/single-page",
} as const;
```

### Production Routes

```typescript
export const PROD_ROUTES = {
  HOME: "/protfolio-rk",
  ABOUT: "/protfolio-rk/about",
  PROJECTS: "/protfolio-rk/projects",
  CONTACT: "/protfolio-rk/contact",
  SINGLE_PAGE: "/protfolio-rk/single-page",
} as const;
```

## Helper Functions

### getRoute()

Returns the appropriate route based on the current environment:

```typescript
const projectsPath = getRoute("PROJECTS");
// Development: '/projects'
// Production: '/protfolio-rk/projects'
```

### getBasename()

Returns the basename for React Router based on environment:

```typescript
const basename = getBasename();
// Development: ''
// Production: '/protfolio-rk'
```

### getNavItems()

Returns navigation items with appropriate paths for the current environment:

```typescript
const navItems = getNavItems();
```

## Usage Examples

### In Components

```typescript
import { ROUTES } from '../constants/paths';

// Use in Link components
<Link to={ROUTES.CONTACT}>Contact</Link>

// Use in navigation logic
if (location.pathname !== ROUTES.SINGLE_PAGE) {
  // Handle navigation
}
```

### In App.tsx

```typescript
import { getBasename, PROD_ROUTES, ROUTES } from "./constants/paths";

function App() {
  const basename = getBasename();
  const routes = import.meta.env.PROD ? PROD_ROUTES : ROUTES;

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path={routes.HOME} element={<HomePage />} />
        {/* Other routes */}
      </Routes>
    </BrowserRouter>
  );
}
```

## Files Updated

The following files have been updated to use the path constants:

- `/src/App.tsx` - Main routing configuration
- `/src/components/Navbar.tsx` - Navigation links and route checking
- `/src/components/Footer.tsx` - Footer navigation links
- `/src/components/Hero.tsx` - Call-to-action buttons

## Benefits

1. **Consistency**: All paths are defined in one place
2. **Maintainability**: Easy to update paths across the entire application
3. **Type Safety**: TypeScript ensures proper usage of route constants
4. **Environment Handling**: Automatic path handling for development vs production
5. **Reduced Errors**: Eliminates hardcoded path strings throughout the codebase

## Adding New Routes

To add a new route:

1. Add the route to `ROUTES` object in `/src/constants/paths.ts`
2. Add the corresponding production route to `PROD_ROUTES`
3. Update `NAV_ITEMS` and `PROD_NAV_ITEMS` if it should appear in navigation
4. Use the new route constant in your components
