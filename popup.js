document.addEventListener('DOMContentLoaded', function() {
    console.log("popup.js loaded");

    const enableButton = document.getElementById('enableButton');
    const disableButton = document.getElementById('disableButton');

    if (enableButton) {
        enableButton.addEventListener('click', () => {
            console.log("Enable button clicked.");
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { action: "enableOverlay" }, () => {
                    window.close();
                });
            });
        });
    }

    if (disableButton) {
        disableButton.addEventListener('click', () => {
            console.log("Disable button clicked.");
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { action: "disableOverlay" }, () => {
                    window.close();
                });
            });
        });
    }
});