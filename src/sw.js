const MENU_COPY = "copy-selected-tab-links";
const MENU_OPTIONS = "open-options";
const OFFSCREEN_URL = "src/offscreen.html";

const DEFAULTS = {
  closeAfterCopy: false,
  separator: " "
};

async function getSettings() {
  const settings = await chrome.storage.sync.get(DEFAULTS);
  return {
    closeAfterCopy: Boolean(settings.closeAfterCopy),
    separator: typeof settings.separator === "string" ? settings.separator : DEFAULTS.separator
  };
}

chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    id: MENU_COPY,
    title: "Copy selected tabs' links",
    contexts: ["action"]
  });

  chrome.contextMenus.create({
    id: MENU_OPTIONS,
    title: "Options…",
    contexts: ["action"]
  });

  // Ensure defaults exist
  const current = await getSettings();
  await chrome.storage.sync.set(current);
});

let creatingOffscreen = null;

async function ensureOffscreenDocument() {
  if (await chrome.offscreen.hasDocument()) return;

  creatingOffscreen ??= chrome.offscreen
    .createDocument({
      url: OFFSCREEN_URL,
      reasons: [chrome.offscreen.Reason.CLIPBOARD],
      justification: "Write the selected tabs' URLs to the clipboard."
    })
    .finally(() => {
      creatingOffscreen = null;
    });
  await creatingOffscreen;
}

// Copying from the extension's own offscreen document avoids the page's clipboard
// permission prompt, which Chrome shows when the active tab has no user activation.
async function writeClipboard(text) {
  await ensureOffscreenDocument();
  const response = await chrome.runtime.sendMessage({ target: "offscreen", type: "copy", text });
  if (!response?.ok) {
    throw new Error("Copying to the clipboard failed.");
  }
}

async function copySelectedTabUrls() {
  const { separator, closeAfterCopy } = await getSettings();

  const tabs = await chrome.tabs.query({
    highlighted: true,
    currentWindow: true
  });

  tabs.sort((a, b) => a.index - b.index);

  const text = tabs
    .map((t) => t.url)
    .filter((u) => typeof u === "string" && u.length > 0)
    .join(separator);

  if (text.length === 0) return;

  await writeClipboard(text);

  if (!closeAfterCopy) return;

  const tabIds = tabs.map((t) => t.id).filter((id) => typeof id === "number");
  if (tabIds.length > 0) {
    await chrome.tabs.remove(tabIds);
  }
}

chrome.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId === MENU_COPY) {
    await copySelectedTabUrls();
    return;
  }

  if (info.menuItemId === MENU_OPTIONS) {
    await chrome.runtime.openOptionsPage();
  }
});

chrome.action.onClicked.addListener(async () => {
  await copySelectedTabUrls();
});
