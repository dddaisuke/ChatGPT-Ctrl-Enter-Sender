let isEnabled = false;
const toggleButton = document.querySelector("#isEnabled");

chrome.storage.sync.get("isEnabled", (data) => {
  isEnabled = data.isEnabled !== undefined ? data.isEnabled : true;
  toggleButton.checked = isEnabled;
  updateIcon();
});

toggleButton.addEventListener("change", () => {
  isEnabled = toggleButton.checked;
  chrome.storage.sync.set({ isEnabled });
  updateIcon();
});

function updateIcon() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = tabs[0].url ?? "";
    if (url.startsWith("https://chatgpt.com") ||
        url.startsWith("https://poe.com") ||
        url.startsWith("https://www.phind.com") ||
        url.startsWith("https://chat.mistral.ai") ||
        url.startsWith("https://www.chatpdf.com") ||
        url.startsWith("https://www.perplexity.ai") ||
        url.startsWith("https://claude.ai") ||
        url.startsWith("https://www.bing.com/chat") ||
        url.startsWith("https://you.com") ||
        url.startsWith("https://dashboard.cohere.com/playground/chat") ||
        url.startsWith("https://ml.azure.com/prompts/flow/") ||
        url.startsWith("https://gemini.google.com") ||
        url.startsWith("https://bolt.new") ||
        url.startsWith("https://felo.ai") ||
        url.startsWith("https://replit.com") ||
        url.startsWith("https://gearindigo.app")) {
      chrome.action.setIcon({ path: isEnabled ? "icon/enabled.png" : "icon/disabled.png" });
    }
  });
}
