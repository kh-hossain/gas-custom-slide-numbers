# Google Slides Custom Page Number Automator

A Google Apps Script that automatically generates, formats, and updates custom page numbers (e.g., `01 / 42`) across a Google Slides presentation.

Google Slides native numbering does not support leading zeros (e.g., `01`) or easy per-slide formatting overrides. This script solves that by injecting self-managing, highly customizable text boxes onto every slide.

## ✨ Features

- **Auto-Calculates Total Slide Number:** Automatically detects the total number of slides.
- **Leading Zeros:** Appends a `0` to single-digit slides (`01`, `02`, ..., `09`).
- **Self-Cleaning:** Tags its own text boxes (using `CustomPageNumberByScript`). If you run the script again after adding/removing slides, it deletes the old numbers before generating new ones to prevent overlaps.
- **Precise Positioning:** Uses an inches-to-points multiplier (`1 inch = 72 points`) for exact X/Y coordinate placement.
- **Custom Slide Overrides:** Easily target specific slides (e.g., title slides, section dividers, closing slides) to change their font color, size, and position without affecting the rest of the deck.

## 🚀 How to Use

1. Open your Google Slides presentation.
2. In the top menu, navigate to **Extensions → Apps Script**.
3. Delete any default code in the editor and paste the `addOrUpdateCustomSlideNumbers` function.
4. Click **Save**.
5. Click **Run**.

   > **Note:** On the first run, Google will prompt you to authorize the script. Click **Review Permissions**, select your account, click **Advanced**, and allow the script to run.

## ⚙️ Customization & Overrides

You can easily adjust the default styling and target specific slides in the code.

### Adjusting Default Position

The script calculates positions in **points**, where:

> **1 inch = 72 points**

```javascript
var posX = 17.9 * 72; // 17.9 inches from the left edge
var posY = 10.61 * 72; // 10.61 inches from the top edge
```

### Overriding Specific Slides

Locate the `// --- 4. CUSTOM OVERRIDES ---` section in the script.

You can use an array of slide numbers to apply unique styling (for example, making the page number golden on transition slides):

```javascript
if ([3, 8, 14, 19, 26, 42].includes(actualSlideNum)) {
  fontColor = "#8c6b29"; // Golden color
  fontSize = 15;

  // Adjust posX and posY as needed...
}
```

## ⚠️ Notes

- Do **not** manually edit the text inside the generated page number boxes. If you need to make changes, edit the script and click **Run** again. The script will automatically replace the old page number boxes.
- The script currently forces the font to **Montserrat**. Ensure this font is available in your Google Workspace, or change the following line to your preferred font:

```javascript
textStyle.setFontFamily("Montserrat");
```