# Tweet Video Renderer

Render tweet and X posts to MP4 locally while preserving the tweet frame.

## Setup

1. Install dependencies:
   `pnpm install`
2. Start the app:
   `pnpm dev`
3. Open:
   `http://localhost:3000`

## Usage

1. Paste an `x.com` or `twitter.com` post URL.
2. Preview the rendered tweet in the browser.
3. Adjust settings such as quoted tweet inclusion and audio.
4. Click `Render MP4 Locally`.
5. Download the generated MP4 when rendering finishes.

## Local Rendering

- Rendering is fully local. AWS Lambda is not required.
- Generated videos are written to `public/renders/`.
- Downloaded media assets are cached under `public/render-assets/`.
- Remotion Studio is available with `pnpm remotion`.

## Notes

- The app is built with Next.js and Remotion.
- Remote media from X/Twitter may be proxied or cached locally during preview and render.
