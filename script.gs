function addOrUpdateCustomSlideNumbers() {
  // We need the active presentation object to interact with the file you currently have open.
  var presentation = SlidesApp.getActivePresentation();

  // We fetch all the slides into an array. This is necessary because we need 
  // to loop through them one by one, and we also need this to calculate the total page count.
  var slides = presentation.getSlides();
  var totalSlides = slides.length; 

// Loop through every single slide, starting at index 0 (which is slide 1).
  for (var i = 0; i < slides.length; i++) {
    var slide = slides[i];

    // Actual human-readable slide number is the index + 1.
    var actualSlideNum = i + 1; 

    // --- 1. CLEANUP PHASE: FIND AND DELETE OLD NUMBERS ---
    // We grab every single shape sitting on this specific slide.
    var shapes = slide.getShapes();
    
    // We loop through all the shapes we found. 
    for (var j = 0; j < shapes.length; j++) {
      // If the shape has our secret "CustomPageNumber" nametag, we know the script 
      // made it during a previous run. We remove() it so we can start fresh.
      // This prevents overlap if you run the script 10 times.
      if (shapes[j].getTitle() == "CustomPageNumberByScript") {
        shapes[j].remove();
      }
    }

    // --- 2. CALCULATE THE NEW NUMBER ---
    // We check if the slide number is single-digit (less than 10). 
    // If it is, we attach a "0" to the front. Otherwise, we just use the normal number.
    var formattedNum = (actualSlideNum < 10) ? "0" + actualSlideNum : actualSlideNum.toString();
    var pageString = formattedNum + " / " + totalSlides;

    // --- 3. DEFAULT STYLING ---
    // Position and width/height is in points. 1 inch = 72 points.
    var posX = 17.9 * 72;      
    var posY = 10.61 * 72;      
    var boxWidth = 1.24 * 72;
    var boxHeight = 0.3 * 72;
    var fontSize = 13.5;
    var fontColor = "#6b7280"; // Grey color

    // --- 4. CUSTOM OVERRIDES ---
    // Example: Target specific slides to change their look or position
    // Position and width/height is in points. 1 inch = 72 points.
    if ([1].includes(actualSlideNum)) {
      posX = 17.58 * 72;
      posY = 9.78 * 72;
      boxWidth = 1.2 * 72;
      boxHeight = 0.36 * 72;
      fontSize = 15;
    }

    if ([totalSlides].includes(actualSlideNum)) {
      posX = 17.58 * 72;
      posY = 9.44 * 72;
      boxWidth = 1.2 * 72;
      boxHeight = 0.36 * 72;
      fontSize = 15;
    }

    if ([3, 8, 14, 19, 26, 42].includes(actualSlideNum)) {
      posX = 17.58 * 72;
      posY = 9.78 * 72;
      boxWidth = 1.2 * 72;
      boxHeight = 0.36 * 72;
      fontSize = 15;
      fontColor = "#8c6b29"; // Golden color
    }

    // --- 5. CREATE AND TAG THE NEW BOX ---
    // A "shape" in Google Apps Script is any object you draw on a slide (like a rectangle, 
    // line, or text box). Here, we explicitly insert a TEXT_BOX shape onto the current slide 
    // and give it X, Y, Width, and Height coordinates.
    var shape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, posX, posY, boxWidth, boxHeight);
    
    // Explicitly set the title of this new shape. 
    // This acts as a hidden tag so the script can find it and delete it next time.
    shape.setTitle("CustomPageNumberByScript");

    // Set vertical alignment to MIDDLE
    shape.setContentAlignment(SlidesApp.ContentAlignment.MIDDLE);
    
    // The "shape" is just the physical container on the slide. To actually manipulate the 
    // words inside it, we have to extract the "TextRange" object from that shape.
    var textRange = shape.getText();
    textRange.setText(pageString);
    
    // Similar to the shape/text separation above, to change how the text looks (font, size), 
    // we need to grab the specific "TextStyle" object tied to this text range.
    var textStyle = textRange.getTextStyle();
    
    textStyle.setFontFamily("Montserrat");
    textStyle.setBold(true);
    
    textStyle.setFontSize(fontSize);
    textStyle.setForegroundColor(fontColor);
    textRange.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
  }
}