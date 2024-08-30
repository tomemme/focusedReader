// functions.js
let overlay;
let revealHeight = 50; // Initial height of the revealed area in pixels
let scrollEnabled = false; // Track whether scroll mode is enabled
let transparency = 0.8; // Initial transparency (0.8 means 80% opaque)
let scrollIndicator; // element to show the scroll lock status

function createOverlay() {
    overlay = document.querySelector('div[style*="z-index: 9999"]');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = `rgba(0, 0, 0, ${transparency})`; // Semi-transparent black
        overlay.style.zIndex = '9999';
        overlay.style.pointerEvents = 'none'; // Allow interactions with the page under the overlay

        // scroll lock status indicator
        scrollIndicator = document.createElement('div');
        scrollIndicator.style.position = 'fixed';
        scrollIndicator.style.top = '10px';
        scrollIndicator.style.right = '10px';
        scrollIndicator.style.color = 'white';
        scrollIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        scrollIndicator.style.padding = '5px 10px';
        scrollIndicator.style.borderRadius = '5px';
        scrollIndicator.style.fontSize = '14px';
        scrollIndicator.style.zIndex = '10000'; // make sure its above everything else
        scrollIndicator.textContent = `Scroll Lock: ${scrollEnabled ? 'Enabled' : 'Disabled'}`;

        overlay.appendChild(scrollIndicator);

        document.body.appendChild(overlay);

        updateOverlay(); // Initial overlay update

        // Add event listeners for controlling the overlay
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('wheel', handleWheel);
        window.addEventListener('mousedown', handleMouseDown);
    }
}

function updateOverlay() {
    if (overlay) {
        overlay.style.clipPath = `inset(${revealHeight}px 0 0 0)`;
        overlay.style.backgroundColor = `rgba(0, 0, 0, ${transparency})`;
        scrollIndicator.style.top = `${revealHeight + 10}px`; // Keep the indicator within the revealed area
        scrollIndicator.textContent = `Scroll Lock: ${scrollEnabled ? 'Enabled' : 'Disabled'}`;
    }
}

function increaseReveal() {
    if (!scrollEnabled) { // Only increase reveal when scroll mode is disabled
        revealHeight += 20; // Increase the revealed area by 20px
        updateOverlay();
    }
}

function decreaseReveal() {
    if (!scrollEnabled && revealHeight > 20) { // Only decrease reveal when scroll mode is disabled
        revealHeight -= 20; // Decrease the revealed area by 20px
        updateOverlay();
    }
}

function increaseTransparency() {
    if (transparency < 1) {
        transparency += 0.1; // Increase the opacity by 10%
        updateOverlay();
    }
}

function decreaseTransparency() {
    if (transparency > 0) {
        transparency -= 0.1; // Decrease the opacity by 10%
        updateOverlay();
    }
}

function toggleScrolling() {
    scrollEnabled = !scrollEnabled;
    document.body.style.overflow = scrollEnabled ? 'auto' : 'hidden';
    console.log("Scroll mode " + (scrollEnabled ? "enabled" : "disabled"));
    updateOverlay(); // update the scroll indicator
}

function removeOverlay() {
    const overlayElement = document.querySelector('div[style*="z-index: 9999"]');
    if (overlayElement) {
        overlayElement.remove();
        console.log("Overlay removed.");
    }
}

// Event listener functions
function handleKeyDown(event) {
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

function handleWheel(event) {
    if (!scrollEnabled) { // Only handle wheel events when scroll mode is disabled
        if (event.deltaY > 0) {
            increaseReveal();
        } else if (event.deltaY < 0) {
            decreaseReveal();
        }
    }
}

function handleMouseDown(event) {
    if (event.button === 4) { // Button 5 is usually represented as button index 4
        toggleScrolling();
    }
}
