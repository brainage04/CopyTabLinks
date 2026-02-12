# Copy Selected Tab Links

Chrome Manifest V3 extension that copies URLs from highlighted tabs in the current Chrome window.

The extension can copy selected tab URLs from the toolbar action or action context menu. URLs are copied with a configurable separator, and tabs can optionally be closed after copying.

See [PRIVACY.md](./PRIVACY.md) for the privacy policy.

## Load in Chrome

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select this folder.

## Usage

Select a range of tabs by clicking the first tab, then holding Shift and clicking the last tab. Click the extension action, or right-click the action and choose **Copy selected tabs' links**.

Open the extension options to configure:

- whether selected tabs close after copying
- the separator between copied URLs

## Development

The extension itself has no build step. After editing files, reload the unpacked extension in `chrome://extensions`, or run:

```sh
npm run reload:extension
```

That helper requires Chrome to already be running with `--remote-debugging-port=9222`.

To regenerate the Chrome Web Store listing images, run:

```sh
npm run render:store-assets
```

That command uses local headless Chrome to render the listing pages in `store-assets/`.

To build the Chrome Web Store upload package, run:

```sh
npm run build:zip
```

This writes `dist/copy-tab-links-1.0.0.zip` with only the runtime extension files.

## Files

- `manifest.json`: Chrome extension manifest.
- `icons/`: Extension icon source and generated PNG assets.
- `src/sw.js`: Service worker for context menu setup and tab URL copying.
- `src/options.html`: Extension options page.
- `src/options.js`: Options page storage logic.
- `scripts/build-extension-zip.js`: Chrome Web Store ZIP builder.
- `scripts/render-store-assets.js`: Local Chrome renderer for Web Store listing images.
- `scripts/reload-extension.js`: Chrome DevTools Protocol helper for reloading the unpacked extension.
- `store-assets/`: Editable listing pages and generated Chrome Web Store images.
