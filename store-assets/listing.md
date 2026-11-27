# Chrome Web Store listing

Text for the developer dashboard. The name and summary come from `manifest.json`.

## Store listing tab

Name: Copy Selected Tab Links

Summary (132 characters at most):

> Copy URLs of selected tabs to clipboard with a configurable separator.

Description:

> Copy Selected Tab Links copies the URLs of the currently selected tabs in the current Chrome window.
>
> Select multiple tabs in Chrome, then click the extension icon or use the extension action menu to copy their links to your clipboard. The separator between copied URLs is configurable, so links can be copied on separate lines, comma-separated, or space-separated.
>
> The extension can also optionally close selected tabs after copying. Settings are stored locally in Chrome storage.
>
> No browsing history, copied URLs, settings, analytics, or diagnostics are sent to the developer or any third party.

Category: Tools

Language: English

Graphics:

- Store icon: `icons/icon128.png`
- Screenshots, in this order: `store-assets/screenshot-copy-flow-1280x800.png`
- Small promo tile: `store-assets/small-promo-tile-440x280.png`

Homepage URL: https://github.com/brainage04/CopyTabLinks

Support URL: https://github.com/brainage04/CopyTabLinks/issues

## Privacy practices tab

Single purpose:

> Copy URLs from the user's selected Chrome tabs to the clipboard with a configurable separator.

`contextMenus` justification:

> Used to add action menu items for copying selected tab links and opening the extension options page.

`tabs` justification:

> Used to find the highlighted tabs in the current Chrome window, read their URLs for copying, preserve their tab order, and optionally close those tabs after copying if the user enables that setting.

`storage` justification:

> Used to save local extension settings, including the configured separator and whether selected tabs should close after copying.

`offscreen` justification:

> Creates an offscreen document solely to write the selected tabs' URLs to the clipboard, since service workers have no clipboard access.

`clipboardWrite` justification:

> Writes the URLs of the user's selected tabs to the clipboard when they click the action or context menu item; this is the extension's only function.

Remote code: No, I am not using remote code.

Data usage: tick none of the data types, then tick all three certifications.

Privacy policy URL: https://github.com/brainage04/CopyTabLinks/blob/main/PRIVACY.md
