// popup.js
document.addEventListener('DOMContentLoaded', function() {
    console.log("popup.js loaded");
    
    const enableButton = document.getElementById('enableButton');
    const disableButton = document.getElementById('disableButton');

    if (enableButton) {
        enableButton.addEventListener('click', () => {
            console.log("Enable button clicked.");
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: createOverlay
                });
            });
        });
    }

    if (disableButton) {
        disableButton.addEventListener('click', () => {
            console.log("Disable button clicked.");
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: removeOverlay
                });
            });
        });
    }
});
