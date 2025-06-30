import type { Plugin } from 'vite';

export function cspPlugin(): Plugin {
  return {
    name: 'csp-plugin',
    transformIndexHtml: {
      order: 'pre',
      handler(html: string, ctx) {
        // Check if we're in development mode
        const isDev = ctx.server !== undefined;

        // Development CSP - very permissive for debugging
        const devCSP = [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'unsafe-hashes'", // Very permissive for dev
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "font-src 'self' https://fonts.gstatic.com",
          "img-src 'self' data: https:",
          "connect-src 'self' ws: wss: http: https:", // Allow all connections for dev
          "object-src 'none'",
          "base-uri 'self'",
        ].join('; ');

        // Production CSP - more restrictive
        const prodCSP = [
          "default-src 'self'",
          "script-src 'self'", // No unsafe-eval in production
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "font-src 'self' https://fonts.gstatic.com",
          "img-src 'self' data: https:",
          "connect-src 'self'",
          "object-src 'none'",
          "base-uri 'self'",
        ].join('; ');

        const csp = isDev ? devCSP : prodCSP;

        // Add CSP meta tag with debugging comment
        const cspMetaTag = `<!-- CSP Plugin Active: isDev=${isDev} -->\n    <meta http-equiv="Content-Security-Policy" content="${csp}" />`;

        return html.replace(
          '<meta charset="UTF-8" />',
          `<meta charset="UTF-8" />\n    ${cspMetaTag}`
        );
      },
    },
  };
}
