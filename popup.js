document.addEventListener('DOMContentLoaded', function() {
    console.log("popup.js loaded");

    const enableButton = document.getElementById('enableButton');
    const disableButton = document.getElementById('disableButton');

    function ensureContentScript(tabId, callback) {
        chrome.tabs.sendMessage(tabId, { action: "ping" }, (response) => {
            if (chrome.runtime.lastError || !response?.ready) {
                chrome.scripting.executeScript(
                    { target: { tabId }, files: ["functions.js"] },
                    () => {
                        chrome.scripting.insertCSS(
                            { target: { tabId }, files: ["styles.css"] },
                            () => callback()
                        );
                    }
                );
            } else {
                callback();
            }
        });
    }

    if (enableButton) {
        enableButton.addEventListener('click', () => {
            console.log("Enable button clicked.");
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const tabId = tabs[0].id;
                ensureContentScript(tabId, () => {
                    chrome.tabs.sendMessage(tabId, { action: "enableOverlay" }, () => {
                        window.close();
                    });
                });
            });
        });
    }

    if (disableButton) {
        disableButton.addEventListener('click', () => {
            console.log("Disable button clicked.");
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const tabId = tabs[0].id;
                chrome.tabs.sendMessage(tabId, { action: "disableOverlay" }, () => {
                    window.close();
                });
            });
        });
    }
});
