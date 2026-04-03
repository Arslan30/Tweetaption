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

## Machine Requirements

This project is not especially GPU-heavy, but local rendering benefits from a decent CPU, enough RAM, and fast SSD storage.

Recommended for smooth local use:

- 6 to 8 CPU cores
- 16 GB RAM
- SSD storage
- Modern desktop or laptop CPU such as Ryzen 5 / Ryzen 7, Intel Core i5 / i7, or Apple Silicon M1 or newer

Minimum usable setup:

- 4 CPU cores
- 8 GB RAM
- SSD strongly recommended

On the minimum setup, preview should still work, but MP4 rendering will be noticeably slower, especially for longer tweets or videos with remote media that must be downloaded first.

Biggest performance factors:

- CPU speed and core count affect render time the most
- RAM helps when running Next.js, Remotion, and Chrome at the same time
- SSD speed helps with cached media, frame generation, and final MP4 output
- A dedicated GPU is optional for this workflow

## Notes

- The app is built with Next.js and Remotion.
- Remote media from X/Twitter may be proxied or cached locally during preview and render.
