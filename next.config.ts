import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Allow first-party SVG mockups in `/public/projects` to be served through
     * next/image. Safe here because every image is a static asset we ship — no
     * user uploads. The CSP + attachment disposition neutralize any embedded
     * scripts, following the Next.js-recommended hardening for SVGs.
     */
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    /**
     * Next.js 16 requires an explicit allowlist of quality values used by
     * next/image. Sharp screenshots are served `unoptimized` (no re-encode, so
     * UI text stays crisp); only the cheap blurred backdrop fills use 50.
     */
    qualities: [50, 75],
  },
};

export default nextConfig;
