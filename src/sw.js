const MENU_COPY = "copy-selected-tab-links";
const MENU_OPTIONS = "open-options";

const DEFAULTS = {
  closeAfterCopy: false,
  separator: " "
};

async function getSettings() {
  const settings = await chrome.storage.sync.get(DEFAULTS);
  return {
    closeAfterCopy: Boolean(settings.closeAfterCopy),
    separator:
      typeof settings.separator === "string" ? settings.separator : DEFAULTS.separator
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

  const active = tabs.find((t) => t.active) ?? tabs[0];
  if (!active?.id) return;

  await chrome.scripting.executeScript({
    target: { tabId: active.id },
    func: async (toCopy) => {
      await navigator.clipboard.writeText(toCopy);
    },
    args: [text]
  });

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