import { ImageResponse } from 'next/og';

// Dynamic share card for the bar-for-autofleet application page, matching
// the page's look — Autofleet's real brand, read live off autofleet.io:
// near-white #F5F5F7 surface, ink #333333 headings, gray #707070 body,
// the #11A4FF CTA blue, and the sky #55C3FF → mint #1EF5B9 signature
// gradient as the base strip. Rendered at build time by next/og (Satori),
// so it uses a flexbox-only subset of CSS and plain hex colours.

export const alt =
  'Bar Moshe for Autofleet — Full Stack Developer. Node.js, Express, React, and the production discipline around them.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 72px 0',
          backgroundColor: '#f5f5f7',
          color: '#333333',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              width: 26,
              height: 26,
              borderRadius: 13,
              background: 'linear-gradient(135deg, #55C3FF, #1EF5B9)',
            }}
          />
          <div style={{ display: 'flex', fontSize: 30, fontWeight: 700 }}>
            bar
          </div>
          <div style={{ display: 'flex', fontSize: 30, color: '#707070' }}>
            for autofleet
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              maxWidth: 980,
            }}
          >
            Ship Your Roadmap with Confidence
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 28,
              lineHeight: 1.45,
              color: '#707070',
              maxWidth: 940,
            }}
          >
            Bar Moshe, applying to Autofleet as a Full Stack Developer.
            Node.js, Express, React, and shipped proof in public.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 46,
          }}
        >
          <div
            style={{
              display: 'flex',
              backgroundColor: '#11A4FF',
              color: '#ffffff',
              padding: '16px 40px',
              borderRadius: 10,
              fontSize: 26,
              fontWeight: 600,
            }}
          >
            bar-for-autofleet.vercel.app
          </div>
          <div style={{ display: 'flex', fontSize: 22, color: '#707070' }}>
            Node.js · Express · React · PostgreSQL
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            height: 18,
            width: '1344px',
            marginLeft: -72,
            background: 'linear-gradient(90deg, #55C3FF 20%, #1EF5B9)',
          }}
        />
      </div>
    ),
    { ...size },
  );
}
