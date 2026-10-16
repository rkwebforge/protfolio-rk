/**
 * @fileoverview Contact details
 *
 * The email is stored base64-encoded so it doesn't appear as plain text in
 * the built bundle, which keeps it away from simple scrapers.
 * Encode a new value with: node -e 'console.log(btoa("value"))'
 */

const decode = (value: string) => atob(value);

export const EMAIL = decode("d2ViZm9yZ2UucmtAZ21haWwuY29t");
export const EMAIL_HREF = `mailto:${EMAIL}`;

export const LOCATION = "Trivandrum, India";
