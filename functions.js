// functions.js
let overlay = null;
let revealHeight = 50; // Initial height of the revealed area in pixels
let scrollEnabled = false; // Track whether scroll mode is enabled
let transparency = 0.8; // Initial transparency (0.8 means 80% opaque)
let scrollIndicator = null; // Element to show the scroll lock status
let isRkeyPressed = false; // Track if the r key is pressed

function createOverlay() {
    if (overlay) return; // Prevent duplicates
    overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%'; // Initial full height, adjusted by clipPath
    overlay.style.backgroundColor = `rgba(0, 0, 0, ${transparency})`;
    overlay.style.zIndex = '9999';
    overlay.style.pointerEvents = 'none';

    scrollIndicator = document.createElement('div');
    scrollIndicator.style.position = 'fixed';
    scrollIndicator.style.top = '10px';
    scrollIndicator.style.right = '10px';
    scrollIndicator.style.color = 'white';
    scrollIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    scrollIndicator.style.padding = '5px 10px';
    scrollIndicator.style.borderRadius = '5px';
    scrollIndicator.style.fontSize = '14px';
    scrollIndicator.style.zIndex = '10000';
    scrollIndicator.textContent = `Scroll Lock: ${scrollEnabled ? 'Enabled' : 'Disabled'}`;

    overlay.appendChild(scrollIndicator);
    document.body.appendChild(overlay);
    updateOverlay(); // Initial update
}

function updateOverlay() {
    if (!overlay) return;
    overlay.style.clipPath = `inset(${revealHeight}px 0 0 0)`;
    overlay.style.backgroundColor = `rgba(0, 0, 0, ${transparency})`;
    scrollIndicator.style.top = `${revealHeight + 10}px`;
    scrollIndicator.textContent = `Scroll Lock: ${scrollEnabled ? 'Enabled' : 'Disabled'}`;
}

function increaseReveal() {
    if (!scrollEnabled) {
        revealHeight += 10;
        updateOverlay();
    }
}

function decreaseReveal() {
    if (!scrollEnabled && revealHeight > 10) {
        revealHeight -= 10;
        updateOverlay();
    }
}

function handlePageClick(event) {
    if (isRkeyPressed && overlay) {
        const clickedY = event.clientY;
        revealHeight = clickedY;
        updateOverlay();
    }
}

function increaseTransparency() {
    if (transparency < 1) {
        transparency += 0.1;
        updateOverlay();
    }
}

function decreaseTransparency() {
    if (transparency > 0) {
        transparency -= 0.1;
        updateOverlay();
    }
}

function toggleScrolling() {
    if (overlay) {
        scrollEnabled = !scrollEnabled;
        document.body.style.overflow = scrollEnabled ? 'auto' : 'hidden';
        console.log("Scroll mode " + (scrollEnabled ? "enabled" : "disabled"));
        updateOverlay();
    }
}

function removeOverlay() {
    if (overlay && document.body.contains(overlay)) {
        document.body.removeChild(overlay);
        overlay = null;
        scrollEnabled = false;
        document.body.style.overflow = 'auto';
        console.log("Overlay removed and scrolling unlocked.");
    }
}

// Event listener functions
function handleKeyDown(event) {
    if (!overlay) return;
    if (event.key === 'r' || event.key === 'R') {
        isRkeyPressed = true;
    }
    if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        increaseReveal();
    } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        decreaseReveal();
    } else if (event.key === 'ArrowRight') {
        increaseTransparency();
    } else if (event.key === 'ArrowLeft') {
        decreaseTransparency();
    } else if (event.key === 's' || event.key === 'S') {
        toggleScrolling();
    }
}

function handleKeyUp(event) {
    if (event.key === 'r' || event.key === 'R') {
        isRkeyPressed = false;
    }
}

function handleWheel(event) {
    if (!overlay || scrollEnabled) return;
    if (event.deltaY > 0) {
        increaseReveal();
    } else if (event.deltaY < 0) {
        decreaseReveal();
    }
}

function handleMouseDown(event) {
    if (!overlay) return;
    if (event.button === 4) { // Button 5
        toggleScrolling();
    }
}

// Message listeners for popup
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "enableOverlay") {
        createOverlay();
    } else if (message.action === "disableOverlay") {
        removeOverlay();
    }
});

// Setup listeners once
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);
window.addEventListener('wheel', handleWheel);
window.addEventListener('mousedown', handleMouseDown);
window.addEventListener('click', handlePageClick);

// Ensure scrolling is enabled by default
document.body.style.overflow = 'auto';