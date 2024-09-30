const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const numRows = 20;
const numCols = 20;
const dt = 0.01; // Time step for numerical integration
const frequencyRange = [1.1, 3.3]; // Adjust this range as needed
const spatialCorrelation = 0.3; // Adjust this value between 0 and 1 to control the spatial correlation

// Get the slider elements
const coupling1Slider = document.getElementById('coupling1');
const coupling2Slider = document.getElementById('coupling2');
const coupling3Slider = document.getElementById('coupling3');
const coupling4Slider = document.getElementById('coupling4');
const couplingSmallWorldSlider = document.getElementById('couplingSmallWorld');

// Get the slider value elements
const coupling1ValueDisplay = document.getElementById('coupling1Value');
const coupling2ValueDisplay = document.getElementById('coupling2Value');
const coupling3ValueDisplay = document.getElementById('coupling3Value');
const coupling4ValueDisplay = document.getElementById('coupling4Value');
const couplingSmallWorldValueDisplay = document.getElementById('couplingSmallWorldValue');

// Calculate the spacing based on canvas dimensions and number of rows and columns
const spacingX = width / numCols;
const spacingY = height / numRows;

// Custom function to generate spatially correlated frequencies
function generateFrequency(row, col) {
const noiseValue = Math.sin(row * spatialCorrelation * Math.PI) * Math.cos(col * spatialCorrelation * Math.PI);
return frequencyRange[0] + (noiseValue + 1) * (frequencyRange[1] - frequencyRange[0]) / 2;
}

// Initialize dots with spatially correlated natural frequencies
const dots = [];
function initializeDots() {
dots.length = 0; // Clear the dots array

for (let i = 0; i < numRows; i++) {
for (let j = 0; j < numCols; j++) {
const x = spacingX * j;
const y = spacingY * i;
const naturalFrequency = spatialCorrelation === 0 ? frequencyRange[0] + Math.random() * (frequencyRange[1] - frequencyRange[0]) : generateFrequency(i, j);
const phase = Math.random() * 2 * Math.PI;
dots.push({ x, y, naturalFrequency, phase });
}
}

// Connect each dot to two random dots
for (let i = 0; i < dots.length; i++) {
const randomIndex1 = Math.floor(Math.random() * dots.length);
const randomIndex2 = Math.floor(Math.random() * dots.length);
dots[i].smallWorldNeighbors = [dots[randomIndex1], dots[randomIndex2]];
}
}

// Helper function to convert CIELAB to RGB
function lab2rgb(lab) {
let y = (lab[0] + 16) / 116,
x = lab[1] / 500 + y,
z = y - lab[2] / 200,
r,
g,
b;

x = 0.95047 * (x * x * x > 0.008856 ? x * x * x : (x - 16 / 116) / 7.787);
y = 1.0 * (y * y * y > 0.008856 ? y * y * y : (y - 16 / 116) / 7.787);
z = 1.08883 * (z * z * z > 0.008856 ? z * z * z : (z - 16 / 116) / 7.787);

r = x * 3.2406 + y * -1.5372 + z * -0.4986;
g = x * -0.9689 + y * 1.8758 + z * 0.0415;
b = x * 0.0557 + y * -0.204 + z * 1.057;

r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r;
g = g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : 12.92 * g;
b = b > 0.0031308 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : 12.92 * b;

return [Math.max(0, Math.min(1, r)) * 255, Math.max(0, Math.min(1, g)) * 255, Math.max(0, Math.min(1, b)) * 255];
}

function update() {
ctx.clearRect(0, 0, width, height);

// Get the current values of coupling from the sliders
const coupling1 = parseFloat(coupling1Slider.value);
const coupling2 = parseFloat(coupling2Slider.value);
const coupling3 = parseFloat(coupling3Slider.value);
const coupling4 = parseFloat(coupling4Slider.value);
const couplingSmallWorld = parseFloat(couplingSmallWorldSlider.value);

// Update the slider value displays
coupling1ValueDisplay.textContent = coupling1.toFixed(1);
coupling2ValueDisplay.textContent = coupling2.toFixed(1);
coupling3ValueDisplay.textContent = coupling3.toFixed(1);
coupling4ValueDisplay.textContent = coupling4.toFixed(1);
couplingSmallWorldValueDisplay.textContent = couplingSmallWorld.toFixed(1);

for (let i = 0; i < dots.length; i++) {
const dot = dots[i];

let couplingTerm = 0;
let numNeighbors = 0;

// Calculate coupling term based on neighboring dots
const row = Math.floor(i / numCols);
const col = i % numCols;

// Check neighbors up to 4 steps away
for (let step = 1; step <= 4; step++) {
  const couplingStrength = step === 1 ? coupling1 : (step === 2 ? coupling2 : (step === 3 ? coupling3 : coupling4));

  // Check left neighbor
  if (col - step >= 0) {
    const leftDot = dots[i - step];
    const phaseDifference = leftDot.phase - dot.phase;
    couplingTerm += couplingStrength * Math.sin(phaseDifference);
    numNeighbors++;
  }

  // Check right neighbor
  if (col + step < numCols) {
    const rightDot = dots[i + step];
    const phaseDifference = rightDot.phase - dot.phase;
    couplingTerm += couplingStrength * Math.sin(phaseDifference);
    numNeighbors++;
  }

  // Check top neighbor
  if (row - step >= 0) {
    const topDot = dots[i - step * numCols];
    const phaseDifference = topDot.phase - dot.phase;
    couplingTerm += couplingStrength * Math.sin(phaseDifference);
    numNeighbors++;
  }

  // Check bottom neighbor
  if (row + step < numRows) {
    const bottomDot = dots[i + step * numCols];
    const phaseDifference = bottomDot.phase - dot.phase;
    couplingTerm += couplingStrength * Math.sin(phaseDifference);
    numNeighbors++;
  }
}

// Calculate coupling term for small world neighbors
for (const neighbor of dot.smallWorldNeighbors) {
  const phaseDifference = neighbor.phase - dot.phase;
  couplingTerm += couplingSmallWorld * Math.sin(phaseDifference);
  numNeighbors++;
}

couplingTerm /= numNeighbors;

// Update phase using the Euler method
dot.phase += (dot.naturalFrequency + couplingTerm) * dt;

// Map phase to CIELAB color
const labColor = [60, 128 * Math.cos(dot.phase), 128 * Math.sin(dot.phase)];
const rgbColor = lab2rgb(labColor);

// Draw square
ctx.fillStyle = `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`;
ctx.fillRect(dot.x, dot.y, spacingX, spacingY);
}

requestAnimationFrame(update);
}

// Initialize dots and start the animation
initializeDots();
update();

// Resize canvas and re-initialize dots on window resize
window.addEventListener('resize', () => {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
initializeDots();
});