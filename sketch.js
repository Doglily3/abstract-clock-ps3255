// Abstract Clock - A creative visualization of time
// Hours: Outer ring color gradient (12-hour format)
// Minutes: Middle circle size
// Seconds: Inner circle rotation

let lastMinute = -1;
let centerX, centerY;

function setup() {
    createCanvas(800, 800);
    centerX = width / 2;
    centerY = height / 2;
    colorMode(HSB, 360, 100, 100); // Use HSB color mode for smooth color transitions
}

function draw() {
    // Get time values
    let hr = hour() % 12; // Convert to 12-hour format (0-11)
    let min = minute();
    let sec = second();
    
    // Print minute value when it changes
    if (min !== lastMinute) {
        console.log("Minute:", min);
        lastMinute = min;
    }
    
    // Map time values to proportions (0-1)
    let hrProportion = hr / 12; // 0-1
    let minProportion = min / 60; // 0-1
    let secProportion = sec / 60; // 0-1
    
    // Background gradient based on hour
    let bgHue = map(hrProportion, 0, 1, 200, 280); // Blue to purple gradient
    background(bgHue, 20, 95);
    
    // Draw outer ring for HOURS (color changes)
    push();
    translate(centerX, centerY);
    
    // Outer ring - represents hours through color
    let hourHue = map(hrProportion, 0, 1, 0, 360); // Full color spectrum
    let hourSaturation = map(hrProportion, 0, 1, 60, 100);
    let hourBrightness = map(hrProportion, 0, 1, 70, 90);
    
    noFill();
    stroke(hourHue, hourSaturation, hourBrightness);
    strokeWeight(20);
    let outerRadius = 300;
    arc(0, 0, outerRadius * 2, outerRadius * 2, 0, TWO_PI * hrProportion);
    
    // Middle circle for MINUTES (size changes)
    let minSize = map(minProportion, 0, 1, 100, 250); // Size from 100 to 250
    fill(hourHue, 40, 80, 0.6);
    noStroke();
    ellipse(0, 0, minSize, minSize);
    
    // Inner circle for SECONDS (rotation)
    push();
    rotate(TWO_PI * secProportion); // Rotate based on seconds
    fill(360 - hourHue, 80, 90, 0.8); // Complementary color
    ellipse(0, 0, 80, 80);
    
    // Add a small indicator line for seconds
    stroke(360 - hourHue, 100, 100);
    strokeWeight(3);
    line(0, 0, 0, -40);
    pop();
    
    // Add subtle hour markers
    stroke(hourHue, 30, 50, 0.3);
    strokeWeight(2);
    for (let i = 0; i < 12; i++) {
        let angle = (TWO_PI / 12) * i;
        let x1 = cos(angle) * (outerRadius - 10);
        let y1 = sin(angle) * (outerRadius - 10);
        let x2 = cos(angle) * (outerRadius + 10);
        let y2 = sin(angle) * (outerRadius + 10);
        line(x1, y1, x2, y2);
    }
    
    // Add minute indicator dots
    noStroke();
    fill(hourHue, 60, 70, 0.5);
    for (let i = 0; i < 60; i += 5) {
        let angle = (TWO_PI / 60) * i;
        let radius = outerRadius - 30;
        let x = cos(angle) * radius;
        let y = sin(angle) * radius;
        ellipse(x, y, 4, 4);
    }
    
    pop();
    
    // Add subtle text hint in corner (optional, for clarity)
    push();
    fill(0, 0, 30, 0.3);
    textSize(14);
    textAlign(LEFT, TOP);
    text("Hours: Outer ring color\nMinutes: Middle circle size\nSeconds: Inner circle rotation", 20, 20);
    pop();
}