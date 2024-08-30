# Focused Reader Extension

**Version:** 1.0

## Overview

The Focused Reader is a browser extension designed to help maintain focus while reading. The extension overlays a semi-transparent blocker on the page, allowing users to reveal lines of text gradually, similar to using a physical page cover in a book.

## Features

- **Virtual Page Cover:** A digital recreation of the analog method of covering a page to reveal one line at a time.
- **Customizable Transparency:** Adjust the opacity of the overlay to suit your reading environment.
- **Scroll Lock Mode:** Toggle between a fixed overlay or scrolling the page as needed.
- **Smooth Line Reveal:** Use arrow keys or the scroll wheel to reveal text line by line, reducing distractions.
- **Mouse Controls:** Toggle scroll mode with a mouse button and adjust transparency with arrow keys.

## How It Works

1. **Enable the Extension:** When the extension is enabled, it creates an overlay that covers the entire webpage.
2. **Adjust Transparency:** Use the right and left arrow keys to increase or decrease the transparency of the overlay.
3. **Reveal Text:** Use the up and down arrow keys or the scroll wheel to gradually reveal more lines of text.
4. **Scroll Lock Mode:** Press the specified mouse button (e.g., Button 5) or the `S` key to toggle scroll lock mode. In this mode, the overlay remains fixed while you can scroll the page underneath.

## Installation

1. Clone or download the project files.
2. Open your browser and go to the Extensions page.
3. Enable Developer Mode.
4. Click on "Load unpacked" and select the directory containing the project files.
5. The extension should now be loaded and ready to use.

## Usage

- **Enable the Overlay:** Use the extension's popup to enable or disable the page blocker.
- **Adjust Overlay Settings:** Customize the transparency and control the line reveal using your keyboard and mouse.

## Development

### File Structure

- `manifest.json`: Defines the extension’s metadata and resources.
- `popup.html`: The UI for enabling and disabling the extension.
- `popup.js`: Controls the behavior of the popup.
- `content.js`: Initializes the overlay on page load.
- `functions.js`: Contains all the shared functions used by the extension.
- `styles.css`: Custom styles for the extension.

### Contributing

Contributions are welcome! Please fork the repository and submit a pull request with any enhancements or bug fixes.

### License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Contact

If you have any questions or feedback, feel free to reach out.