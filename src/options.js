const DEFAULTS = {
  closeAfterCopy: false,
  separator: " "
};

function decodeSeparator(input) {
  return input.replaceAll("\\n", "\n").replaceAll("\\t", "\t");
}

function encodeSeparator(value) {
  return value.replaceAll("\n", "\\n").replaceAll("\t", "\\t");
}

async function load() {
  const { closeAfterCopy, separator } = await chrome.storage.sync.get(DEFAULTS);

  document.getElementById("closeAfterCopy").checked = Boolean(closeAfterCopy);
  document.getElementById("separator").value = encodeSeparator(separator);
}

async function save() {
  const closeAfterCopy = document.getElementById("closeAfterCopy").checked;
  const rawSep = document.getElementById("separator").value;
  const separator = decodeSeparator(rawSep);

  await chrome.storage.sync.set({ closeAfterCopy, separator });

  const status = document.getElementById("status");
  status.textContent = "Saved.";
  setTimeout(() => {
    status.textContent = "";
  }, 1000);
}

document.getElementById("save").addEventListener("click", save);
load();