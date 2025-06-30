# Deployment Fix Documentation

This document outlines the fixes applied to resolve GitHub Pages deployment issues.

## Issues Fixed

### 1. Content Security Policy (CSP) Error

**Error**: `Refused to execute inline script because it violates the following Content Security Policy directive`

**Solution**:

- Updated CSP plugin to allow `'unsafe-inline'` for production builds
- GitHub Pages requires inline scripts for proper functioning
- The CSP is now more permissive for production while maintaining security

**Files Modified**:

- `vite-plugins/csp.ts`

### 2. Asset Path Issues

**Error**: `GET https://rkwebforge.github.io/src/assets/profile_img/dp.avif 404 (Not Found)`

**Solutions**:

- Fixed Vite build configuration to handle assets properly
- Set `assetsInlineLimit: 0` to prevent CSP issues with inline assets
- Updated asset naming pattern for better organization

**Files Modified**:

- `vite.config.ts`

### 3. Manifest and Icon Path Issues

**Error**: `GET https://rkwebforge.github.io/android-chrome-192x192.png 404 (Not Found)`

**Solutions**:

- Created dynamic manifest plugin that generates different manifests for dev/prod
- Updated `manifest.json` with correct base paths
- Added proper scope and start_url for PWA functionality

**Files Modified**:

- `public/manifest.json`
- `vite-plugins/manifest.ts` (new)
- `vite.config.ts`

## Configuration Details

### Vite Configuration Updates

```typescript
// vite.config.ts
export default defineConfig(({ mode }) => ({
  plugins: [react(), cspPlugin(), manifestPlugin()],
  base: mode === "production" ? "/protfolio-rk/" : "/",
  build: {
    assetsInlineLimit: 0, // Prevent CSP issues
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (
            assetInfo.name &&
            /\.(png|jpe?g|gif|svg|webp|avif)$/.test(assetInfo.name)
          ) {
            return "assets/[name]-[hash].[ext]";
          }
          return "assets/[name]-[hash].[ext]";
        },
      },
    },
  },
}));
```

### CSP Configuration

**Development CSP**: Very permissive for debugging

```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval' 'unsafe-hashes';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
...
```

**Production CSP**: GitHub Pages compatible

```
default-src 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
...
```

### Manifest Configuration

**Development**:

- `start_url: "/"`
- `scope: "/"`
- Icon paths: `/android-chrome-*.png`

**Production**:

- `start_url: "/protfolio-rk/"`
- `scope: "/protfolio-rk/"`
- Icon paths: `/protfolio-rk/android-chrome-*.png`

## Deployment Process

### Automated Deployment

Use the provided deployment script:

```bash
./deploy.sh
```

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to GitHub Pages
npm install --save-dev gh-pages
npx gh-pages -d dist
```

## Verification Steps

After deployment, verify:

1. **Site loads properly**: Visit `https://rkwebforge.github.io/protfolio-rk/`
2. **No CSP errors**: Check browser console for CSP violations
3. **Images load**: Verify profile image and icons display correctly
4. **PWA functionality**: Check if manifest loads and app can be installed
5. **Navigation works**: Test all routes and links

## Environment-Specific Behavior

### Development (`npm run dev`)

- Base URL: `/`
- Assets served from `/src/assets/`
- Permissive CSP for hot reloading
- Dev manifest with local paths

### Production (`npm run build`)

- Base URL: `/protfolio-rk/`
- Assets bundled with hashes
- Restrictive but GitHub Pages compatible CSP
- Production manifest with full paths

## Troubleshooting

### If images still don't load:

1. Check that assets are in the `dist` folder after build
2. Verify the image imports use Vite's asset handling: `import image from './path/to/image.ext'`
3. Ensure base path is correctly set in vite.config.ts

### If CSP errors persist:

1. Check browser console for specific CSP violations
2. Update CSP in `vite-plugins/csp.ts` as needed
3. Consider using nonces for more secure inline script handling

### If PWA features don't work:

1. Verify manifest.json is accessible at the deployed URL
2. Check that manifest paths match the deployed structure
3. Ensure proper HTTPS setup (GitHub Pages provides this automatically)

## Performance Considerations

- Assets are not inlined (`assetsInlineLimit: 0`) to avoid CSP issues
- Code splitting is maintained for optimal loading
- Images are optimized with proper file naming
- Proper caching headers from GitHub Pages CDN
