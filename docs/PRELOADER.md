# Preloader Implementation

This directory contains a full-screen preloader system with the following components:

## Components

### `Loader.tsx`

Full-screen preloader component with:

- **Dark-mode aware background** - Automatically adapts to theme
- **Centered brand logo** - Reuses logo design from Navbar for consistency
- **CSS keyframe animations** - Performance-optimized rotating rings and pulsing dots
- **Smooth fade-out transition** - 400ms opacity transition on completion
- **Accessibility support** - Proper ARIA labels and live regions

```tsx
<Loader isVisible={!isReady} onAnimationComplete={() => setShowLoader(false)} />
```

### `AppWrapper.tsx`

Higher-order component that handles loading logic:

- **Scroll prevention** - Blocks scrolling while loading
- **App hiding** - Sets `aria-hidden="true"` on main app during load
- **Async operation support** - Waits for custom promises to resolve
- **Minimum load time** - Ensures loader shows for better UX

```tsx
<AppWrapper
  asyncOperations={[
    fetch('/api/config').then(res => res.json()),
    import('./heavy-component'),
  ]}
  minimumLoadTime={1000}
>
  <App />
</AppWrapper>
```

## Hooks

### `usePageReady.ts`

Custom hook that tracks page readiness:

- **Window load detection** - Waits for `window.onload` event
- **Promise coordination** - Handles multiple async operations
- **Error handling** - Gracefully handles failed operations
- **Mount safety** - Prevents state updates on unmounted components

```tsx
const { isReady, error } = usePageReady([
  fetch('/api/user').then(res => res.json()),
  new Promise(resolve => setTimeout(resolve, 1000)),
]);
```

## Usage Examples

### Basic Implementation (main.tsx)

```tsx
import AppWrapper from './components/AppWrapper';

const asyncOperations = [
  new Promise(resolve => setTimeout(() => resolve({ theme: 'dark' }), 300)),
  new Promise(resolve => setTimeout(() => resolve(true), 200)),
];

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWrapper asyncOperations={asyncOperations} minimumLoadTime={1000}>
      <RouterProvider router={router} />
    </AppWrapper>
  </StrictMode>
);
```

### Advanced Custom Implementation

```tsx
const { isReady, error } = usePageReady([
  document.fonts.ready,
  fetch('/api/config').then(res => res.json()),
  new Promise(resolve => setTimeout(resolve, 800)),
]);

return (
  <>
    {!isReady && <Loader isVisible={true} />}
    <div aria-hidden={!isReady}>
      <App />
    </div>
  </>
);
```

## Technical Details

- **React 19 compatible** - Uses modern hooks and patterns
- **TypeScript strict mode** - Full type safety
- **Tailwind CSS** - Utility-first styling with no inline styles
- **Framer Motion** - Smooth animations and transitions
- **Performance optimized** - CSS keyframes for heavy animations
- **Accessibility first** - WCAG compliant with proper ARIA support

## Animation Details

The loader includes three types of animations:

1. **Rotating ring** - 2s linear infinite rotation
2. **Pulsing ring** - 3s ease-in-out scaling effect
3. **Fading dots** - 1.5s staggered fade sequence

All animations use CSS keyframes for optimal performance and are GPU-accelerated.

## Error Handling

The system gracefully handles:

- Failed async operations (logs in development)
- Network errors during fetching
- Component unmounting during load
- Browser compatibility issues

If any async operation fails, the loader will still complete to prevent infinite loading states.
